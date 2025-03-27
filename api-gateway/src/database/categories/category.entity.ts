import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../Base/base.entity";
import { SeoEntity } from "../seos/seo.entity";

@Entity({name : 'categories'})
export class CategoryEntity extends BaseEntity {
    @Column()
    name : string;

    @Column()
    slug : string;

    @Column({default : 'Active', nullable : true})  
    status : string;

    @Column({default : false, nullable : true})
    isParent : boolean;

    @Column({type : 'text', nullable : true})
    parentCategory : string;

    @OneToOne(()=>SeoEntity, {
        nullable : true,
        onDelete : 'RESTRICT',
        cascade : true
    })
    @JoinColumn()
    seo : SeoEntity;
}