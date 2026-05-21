export class HealthPreferenceInputDto {
  key!: string;
  value!: string;
}

export class UpsertHealthPreferencesDto {
  preferences!: HealthPreferenceInputDto[];
}
