import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

const RESET_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

function getBaseUrl(request: NextRequest): string {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }

  return request.nextUrl.origin;
}

async function sendResetEmail(toEmail: string, resetLink: string) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail =
    process.env.EMAIL_FROM ||
    process.env.EMAIL_USER ||
    smtpUser;

  if (!fromEmail) {
    throw new Error("Missing EMAIL_FROM/EMAIL_USER/SMTP_USER for sender email");
  }

  if (smtpHost && smtpPort && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
          <h2 style="margin-bottom: 8px;">Password reset request</h2>
          <p>We received a request to reset your password.</p>
          <p>
            Click this link to set a new password:<br />
            <a href="${resetLink}">${resetLink}</a>
          </p>
          <p>This link expires in 24 hours.</p>
          <p>If you did not request this, you can ignore this email.</p>
        </div>
      `,
    });

    return;
  }

  const gmailUser = process.env.EMAIL_USER;
  const gmailPass = process.env.EMAIL_PASSWORD;

  if (gmailUser && gmailPass) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
          <h2 style="margin-bottom: 8px;">Password reset request</h2>
          <p>We received a request to reset your password.</p>
          <p>
            Click this link to set a new password:<br />
            <a href="${resetLink}">${resetLink}</a>
          </p>
          <p>This link expires in 24 hours.</p>
          <p>If you did not request this, you can ignore this email.</p>
        </div>
      `,
    });

    return;
  }

  throw new Error("No email transport configured (SMTP_* or EMAIL_USER/EMAIL_PASSWORD)");
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration attacks
    if (!user) {
      return NextResponse.json(
        { message: "If email exists, reset link has been sent" },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Create verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: hashedToken,
        expires: new Date(Date.now() + RESET_TOKEN_EXPIRY),
      },
    });

    const baseUrl = getBaseUrl(request);
    const resetLink = `${baseUrl}/reset-password?token=${encodeURIComponent(resetToken)}&email=${encodeURIComponent(email)}`;

    try {
      await sendResetEmail(email, resetLink);
    } catch (mailError) {
      console.error("Failed to send reset email:", mailError);

      if (process.env.NODE_ENV !== "production") {
        return NextResponse.json(
          {
            message: "Email transport not configured. Use this link in development.",
            resetLink,
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { message: "If email exists, reset link has been sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
