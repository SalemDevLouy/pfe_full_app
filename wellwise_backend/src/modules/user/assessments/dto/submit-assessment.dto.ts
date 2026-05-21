export class AssessmentAnswerInputDto {
  questionKey!: string;
  questionLabel!: string;
  answer!: unknown;
  score?: number;
}

export class SubmitAssessmentDto {
  notes?: string;
  answers!: AssessmentAnswerInputDto[];
}
