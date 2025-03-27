import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatResponseHandler } from 'src/handlers/formattedResponse';
import { Repository } from 'typeorm';
import { SeoEntity } from 'src/database/seos/seo.entity';
import { SlugifyHandler } from 'src/handlers/slugifyHandler';
import { TagsEntity } from 'src/database/tags/tags.entity';

@Injectable()
export class TagsService {
    constructor(@InjectRepository(TagsEntity) private readonly TagRepository : Repository<TagsEntity>,
    @InjectRepository(SeoEntity) private readonly SeoRepository : Repository<SeoEntity>
){}

    async addTagDataHandler(reqBody){
        try {
            let isExist = await this?.TagRepository?.findOneBy({slug : reqBody?.slug});

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

            let newRecordInstance = await this?.TagRepository?.create({
                ...reqBody,
                slug : SlugifyHandler(reqBody?.name),
                createdAt : new Date(),
                seo : seoData
            })

            let createdRecord = await this.TagRepository.save(newRecordInstance);

            if(createdRecord) return formatResponseHandler(reqBody?.createdSuccessfullyMsg, null, 201);

            return formatResponseHandler(reqBody?.errorWhileCreatingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async getAllTagsHandler(reqBody){
        try {
            let fetchedData = await this?.TagRepository?.find({order : {createdAt : 'DESC'}, select : ['name', 'slug']});

            if(fetchedData?.length > 0) return formatResponseHandler(reqBody?.dataFetchedSuccessfullyMsg, fetchedData, 200);

            return formatResponseHandler(reqBody?.notFoundMsg, null, 404);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async getTagByIdHandler(reqBody){
        try {
            //@ts-ignore
            let fetchedData  = await this?.TagRepository?.find({where : {slug : reqBody?.slug}, select : {name : true, slug : true, seo : {metaTitle : true, metaDescription : true, metaKeywords : true}}, relations : ['seo']});

            if(fetchedData?.length > 0) return formatResponseHandler(reqBody?.dataFetchedSuccessfullyMsg, fetchedData?.[0], 200);

            return formatResponseHandler(reqBody?.notFoundMsg, null, 404);
        } catch (error) {
            console.log(error)
            return formatResponseHandler(error, null, 400);
        }
    }

    async updateTagDataHandler(reqBody){
        try {
            let {slug, updatedSuccessfullyMsg, notFoundMsg, errorWhileUpdatingMsg, seo, ...restUpdateObj} = reqBody;

            let fetchedData : any = await this?.TagRepository?.findOne({where : {slug}, relations : ['seo']});

            if(!fetchedData) return formatResponseHandler(notFoundMsg, null, 404);

            if(seo){
                await this?.SeoRepository?.update({id : fetchedData?.seo?.id}, {...seo, updatedAt : new Date()})
            }

            let slugVal = SlugifyHandler(reqBody?.name);
            let updateToObj = restUpdateObj;
            if(reqBody?.name) updateToObj.slug = slugVal;

            let updatedData = await this?.TagRepository?.update({slug}, {...updateToObj, updatedAt : new Date()});

            if(updatedData?.affected != 0) return formatResponseHandler(updatedSuccessfullyMsg, null, 200);

            return formatResponseHandler(errorWhileUpdatingMsg, null, 400);
        } catch (error) {
            console.log(error)
            return formatResponseHandler(error, null, 400);
        }
    }

    async deleteTagDataHandler(reqBody){
        try {
            let {slug} = reqBody;

            let isExist = await this?.TagRepository?.findOne({where : {slug}, relations : ['seo']});

            if(!isExist) return formatResponseHandler(reqBody?.notFoundMsg, null, 404);

            let deletedData = await this?.TagRepository?.delete({slug});

            if(deletedData?.affected != 0){
                await this?.SeoRepository?.delete({id : isExist?.seo?.id});
                return formatResponseHandler(reqBody?.deletedSuccessfullyMsg, null, 200);
            }

            return formatResponseHandler(reqBody?.errorWhileDeletingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }
}
