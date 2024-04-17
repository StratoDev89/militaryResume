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

export interface WorkExperience {
  id: string;
  position: string;
  organization: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  startDate: Date;
  endDate: Date | string;
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

export type LevelAttained =
  | 'High School Diploma'
  | 'Some College (No Degree)'
  | "Associate's Degree"
  | "Bachelor's Degree"
  | "Master's Degree"
  | 'Doctoral Degree'
  | 'Professional Degree (e.g., MD, JD, DDS)';

export interface Education {
  id: string;
  degree: string;
  acronym: string;
  yearGraduated: string;
  levelAttained: LevelAttained;
}

export interface Certification {
  id: string;
  certification: string;
}

export interface Award {
  id: string;
  award: string;
}

export interface AdditionalInfo {
  id: string;
  additionalInfo: string;
}

export type LanguageLevels = 'None' | 'Novice' | 'Intermediate' | 'Advanced';
export interface Language {
  id: string;
  language: string;
  spoken: LanguageLevels;
  read: LanguageLevels;
  written: LanguageLevels;
}

export interface Reference {
  id: string;
  name: string;
  employer: string;
  title: string;
  phone?: string;
  email: string;
}
