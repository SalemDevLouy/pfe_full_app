export class CreateReportDto {
  type!: 'SALES' | 'USERS' | 'PRODUCTS' | 'HEALTH' | 'CUSTOM';
  title?: string;
  filters?: Record<string, any>;
}
