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

export const mapEnglishLevel = (value: string) => {
  const lowerCaseValue = String(value).toLowerCase();
  switch (lowerCaseValue) {
    case 'none':
      return EnglishLevel.NONE;
    case 'basic':
      return EnglishLevel.BASIC;
    case 'intermediate':
      return EnglishLevel.INTERMEDIATE;
    case 'advanced':
      return EnglishLevel.ADVANCED;
    default:
      return EnglishLevel.NONE;
  }
};

export const mapRole = (value: string) => {
  const lowerCaseValue = String(value).toLowerCase();
  switch (lowerCaseValue) {
    case 'user':
      return Role.USER;
    case 'admin':
      return Role.ADMIN;
    default:
      return Role.USER;
  }
};
