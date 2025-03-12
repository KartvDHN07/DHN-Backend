import { IsNotEmpty, IsOptional } from 'class-validator';

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
    id : string;

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    password : string;

    @IsNotEmpty()
    confirmPassword : string;
}