import { Column, Entity } from "typeorm";
import { BaseEntity } from "../Base/base.entity";

@Entity({name : 'creator'})
export class CreatorEntity extends BaseEntity {
    @Column()
    name : string;

    @Column()
    email : string;

    @Column()
    password : string;

    @Column({nullable : true})
    contact : string;
}