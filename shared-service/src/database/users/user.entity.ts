import {Column, Entity } from "typeorm";
import { BaseEntity } from "../Base/base.entity";

@Entity({name : 'users'})
export class UserEntity extends BaseEntity {

    @Column({nullable : true})
    name : string;

    @Column({unique : true, nullable : true})
    email : string;

    @Column({nullable : true})
    password : string;

    @Column({unique : true, nullable : true})
    contact : string;
}