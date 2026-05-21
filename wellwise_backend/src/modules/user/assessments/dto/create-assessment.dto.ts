import { AssessmentType } from '@prisma/client';

export class CreateAssessmentDto {
  type!: AssessmentType;
  notes?: string;
}
