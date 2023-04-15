export interface UserEntity {
  id: number;
  createdAt?: string;
  email: string;
  fistName: string;
  lastName: string;
  phone?: string;
  role: Role;
  password: string;
  startDate: string;
  endDate?: string;
  englishLevel: EnglishLevel;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum EnglishLevel {
  NONE = 'NONE',
  BASIC = 'BASIC',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}
