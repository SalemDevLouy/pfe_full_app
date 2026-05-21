-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "attributes" JSONB,
ADD COLUMN     "ingredients" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
