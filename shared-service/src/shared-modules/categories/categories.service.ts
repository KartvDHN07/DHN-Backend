import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatResponseHandler } from 'src/handlers/formattedResponse';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/database/categories/category.entity';
import { SeoEntity } from 'src/database/seos/seo.entity';
import { SlugifyHandler } from 'src/handlers/slugifyHandler';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(CategoryEntity) private readonly CategoryRepository : Repository<CategoryEntity>,
    @InjectRepository(SeoEntity) private readonly SeoRepository : Repository<SeoEntity>
){}

    async addCategoryDataHandler(reqBody){
        try {
            let isExist = await this?.CategoryRepository?.findOneBy({slug : reqBody?.slug});

            if(isExist) return formatResponseHandler(reqBody?.alreadyExistMsg, null, 400);

            let seoData : any = null;
            if(reqBody?.seo) seoData = reqBody?.seo;

            if(seoData) {
                let seoInstance = this?.SeoRepository?.create({
                    ...seoData,
                    createdAt : new Date()
                })

                seoData = await this?.SeoRepository.save(seoInstance);
            }

            let newRecordInstance = await this?.CategoryRepository?.create({
                ...reqBody,
                slug : SlugifyHandler(reqBody?.name),
                createdAt : new Date(),
                seo : seoData?.id
            })

            let createdRecord = await this.CategoryRepository.save(newRecordInstance);

            if(createdRecord) return formatResponseHandler(reqBody?.createdSuccessfullyMsg, null, 201);

            return formatResponseHandler(reqBody?.errorWhileCreatingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async getAllCategorysHandler(reqBody){
        try {
            let fetchedData = await this?.CategoryRepository?.find({order : {createdAt : 'DESC'}, select : ['name', 'slug', 'isParent', 'status']});

            if(fetchedData?.length > 0) return formatResponseHandler(reqBody?.dataFetchedSuccessfullyMsg, fetchedData, 200);

            return formatResponseHandler(reqBody?.notFoundMsg, null, 404);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async getCategoryByIdHandler(reqBody){
        try {
            //@ts-ignore
            let fetchedData  = await this?.CategoryRepository?.find({where : {slug : reqBody?.slug}, select : {name : true, slug : true, parentCategory : true, seo : {metaTitle : true, metaDescription : true, metaKeywords : true}}, relations : ['seo']});

            if(fetchedData?.length > 0) return formatResponseHandler(reqBody?.dataFetchedSuccessfullyMsg, fetchedData?.[0], 200);

            return formatResponseHandler(reqBody?.notFoundMsg, null, 404);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async updateCategoryDataHandler(reqBody){
        try {
            let {slug, name, updatedSuccessfullyMsg, notFoundMsg, errorWhileUpdatingMsg, ...restUpdateObj} = reqBody;

            let fetchedData = await this?.CategoryRepository?.findOne({where : {slug}});

            if(!fetchedData) return formatResponseHandler(notFoundMsg, null, 404);

            let slugVal = SlugifyHandler(name);

            let updatedData = await this?.CategoryRepository?.update({slug}, {
                ...restUpdateObj,
                name,
                slug : name ? slugVal : slug,
                updatedAt : new Date(),
            })

            if(updatedData?.affected != 0) return formatResponseHandler(updatedSuccessfullyMsg, null, 200);

            return formatResponseHandler(errorWhileUpdatingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async deleteCategoryDataHandler(reqBody){
        try {
            let {slug} = reqBody;

            let isExist = await this?.CategoryRepository?.findOneBy({slug});

            if(!isExist) return formatResponseHandler(reqBody?.notFoundMsg, null, 404);

            let deletedData = await this?.CategoryRepository?.delete({slug});

            if(deletedData?.affected != 0) return formatResponseHandler(reqBody?.deletedSuccessfullyMsg, null, 200);

            return formatResponseHandler(reqBody?.errorWhileDeletingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }
}
