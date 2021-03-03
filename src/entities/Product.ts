import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Scan } from "./Scan";

@ObjectType()
@Entity()
export class Product extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    // eg. ABC-abc-1234
    @Field(() => String, { nullable: true })
    @Column()
    barcode: string;

    @Field(() => String)
    @Column()
    name!: string;

    @Field()
    @Column({ type: "float", default: 0 })
    price!: number;

    // ------------------------
    // ASSOCIATIONS
    // ------------------------
    @OneToMany(() => Scan, (scan) => scan.product)
    scans: Scan[];


    // timestamps
    // ------------------------
    @Field(() => String)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = new Date();

}
