import { IsNotEmpty, IsOptional } from "class-validator";

interface SeoObjects {
    metaTitle : string;
    metaDescription : string;
    metaKeywords : string;
}

class BaseCategoryDTO {
    @IsOptional()
    status : string;

    @IsOptional()
    isParent : boolean;

    @IsOptional()
    parentCategory : boolean;

    @IsOptional()
    seo : SeoObjects;

    @IsOptional()
    createdAt : Date;

    @IsOptional()
    updatedAt : Date;
}

export class CreateCategoryDTO extends BaseCategoryDTO {

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    slug : string;

}

export class UpdateCategoryDTO extends BaseCategoryDTO {
    
    @IsOptional()
    name : string;

    @IsOptional()       
    slug : string;

}