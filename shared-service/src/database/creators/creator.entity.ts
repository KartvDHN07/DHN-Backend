import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../Base/base.entity";
import { RoleEntity } from "../roles/role.entity";

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

    @OneToOne(()=>RoleEntity, {
        nullable : true,
    })
    @JoinColumn()
    role : string;
}