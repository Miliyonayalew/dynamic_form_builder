interface FieldOption {
  label: string;
  value: string;
}

export interface FieldConfig {
  type: string;
  label: string;
  placeholder: string;
  validationRules: string;
  options: FieldOption[];
}