import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../Base/base.entity';
import { SeoEntity } from '../seos/seo.entity';

@Entity({ name: 'tags' })
export class TagsEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    slug: string;

    @OneToOne(() => SeoEntity, { cascade: true, nullable : true })
    @JoinColumn()
    seo: SeoEntity;
}
