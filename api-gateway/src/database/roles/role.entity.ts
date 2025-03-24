import { Column, Entity } from "typeorm";
import { BaseEntity } from "../Base/base.entity";

@Entity({name : 'roles'})
export class RoleEntity extends BaseEntity {

    @Column()
    name : string;

    @Column()
    slug : string;

    @Column({nullable : true})
    description : string;

    @Column({default : false})
    isActive : boolean;

    @Column({type : 'text', nullable : true})
    permissions : string;
}