import { isNotEmpty, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class OTPVerifyDTO {
  @IsNotEmpty()
  OTP: string;

  @IsOptional()
  contact: string;

  @IsOptional()
  email: string;
}

export class PasswordVerifyDTO {
  @IsNotEmpty()
  password: string;

  @IsOptional()
  contact: string;

  @IsOptional()
  email: string;
}

export class CompleteProfileDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}

export class AdminLoginDTO {
  @IsNotEmpty()
  @Matches(/^(?=.*[\W_]).{8,}@\w+\.\w+$/, {
    message: 'Email must be at least 8 characters long, contain at least one special character, and have a valid domain (e.g., @abc.com, @xyz.com, etc.)',
  })
  email: string;

  @IsNotEmpty()
  password: string;
}
