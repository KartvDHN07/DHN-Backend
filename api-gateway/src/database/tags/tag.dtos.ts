import { IsNotEmpty, IsOptional } from "class-validator";

interface SeoObjects {
    metaTitle : string;
    metaDescription : string;
    metaKeywords : string;
}

class BaseTagsDTO {

    @IsOptional()
    seo : SeoObjects;

    @IsOptional()
    createdAt : Date;

    @IsOptional()
    updatedAt : Date;
}

export class CreateTagsDTO extends BaseTagsDTO {
    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    slug : string;
}

export class UpdateTagsDTO extends BaseTagsDTO {
    @IsOptional()
    name : string; 

    @IsOptional()
    slug : string;
}