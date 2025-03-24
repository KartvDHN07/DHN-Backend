import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCreatorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  contact: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  role : string;
}

export class UpdateCreatorDto {

  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  contact: string;

  @IsOptional()
  updatedAt: Date;

  @IsOptional()
  role : string;
}
