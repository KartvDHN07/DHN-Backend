import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateRoleDTO {
    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    slug : string;

    @IsOptional()
    description : string;

    @IsOptional()
    isActive : boolean;

    @IsOptional()    
    permissions : any;

    @IsOptional()
    createdAt : Date;
}

export class UpdateRoleDTO {
    @IsOptional()
    name : string;

    @IsOptional()
    slug : string;

    @IsOptional()
    description : string;

    @IsOptional()
    isActive : boolean;

    @IsOptional()    
    permissions : any;

    @IsOptional()
    updatedAt : Date;
}