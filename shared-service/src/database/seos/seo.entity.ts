import { Column, Entity } from "typeorm";
import { BaseEntity } from "../Base/base.entity";

@Entity({name : 'seos'})
export class SeoEntity extends BaseEntity {
    @Column({nullable : true})
    metaTitle : string;

    @Column({type : 'text', nullable : true})
    metaDescription : string;

    @Column({nullable : true})
    metaKeywords : string;
}