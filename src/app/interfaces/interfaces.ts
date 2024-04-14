export interface HeaderFormInfo {
  firstName: string;
  lastName: string;
  state: string;
  street: string;
  zipCode: string;
  phone: string;
  email: string;
  city: string;
}

export type Summary = string | null;

export interface workExperience {
  id:string;
  position: string;
  organization: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  startDate: Date;
  endDate: Date;
  hours: string;
  salary: string;
  skills: string;
}

export interface FormField {
  type: string;
  label: string;
  name: string;
  value?: any;
  options?: string[];
}
