import { IsOptional } from 'class-validator';

export class CreateBaseDTO {
  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
