import { GoalStatus } from '@prisma/client';

export class UpdateHealthGoalDto {
  title?: string;
  targetValue?: string;
  unit?: string;
  status?: GoalStatus;
}
