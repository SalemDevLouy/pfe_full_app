export class CreateReviewDto {
  productId!: string;
  rating!: number;
  title?: string;
  comment?: string;
}
