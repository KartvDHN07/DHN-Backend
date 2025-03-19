import { Column, Entity } from "typeorm";
import { BaseEntity } from "../Base/base.entity";

@Entity('permissions')
export class PermissionEntity extends BaseEntity {

    @Column()
    name: string;

    @Column()
    slug : string;

    @Column({default : false})
    isActive : boolean

}