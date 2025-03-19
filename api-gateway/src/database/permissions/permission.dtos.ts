import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePermissionDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  slug: string;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  createdAt: Date;
}

export class UpdatePermissionDTO {

  @IsOptional()
  name: string;

  @IsOptional()
  slug: string;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  updatedAt: Date;
}

