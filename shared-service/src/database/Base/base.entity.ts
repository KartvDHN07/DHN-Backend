import { Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({nullable : true})
    createdAt : Date;

    @Column({nullable : true})
    updatedAt : Date;

}