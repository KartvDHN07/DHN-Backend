import { IsOptional, Matches } from "class-validator";
import { CreateBaseDTO } from "../Base/base.dtos";

export class CreateUserDTO extends CreateBaseDTO {
    @IsOptional()
    name : string;

    @IsOptional()
    email : string;

    @IsOptional()
    password : string;

    @IsOptional()
    @Matches(/^\+?[0-9]+$/, { message: 'mobileNumber must contain only numbers and an optional leading +.' })
    contact : string;
}