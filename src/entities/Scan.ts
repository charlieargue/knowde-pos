import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

// ------------------------
// J O I N     T A B L E  (explicit)
// ------------------------

@ObjectType()
@Entity()
export class Scan extends BaseEntity {

    // EXTRA COLUMNs
    // ------------------------
    @Field()
    @Column({ type: "float" })
    price!: number;

    // JOIN COLUMNS (FKs)
    // ------------------------
    @Field()
    @PrimaryColumn()
    userId: number; // cashier at register doing the scanning


    @Field()
    @PrimaryColumn()
    productId: number;

    // sub-objects
    // ------------------------

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.scans)
    user: User;


    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.scans)
    product : Product;


    // timestamps
    // ------------------------
    @Field(() => String)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = new Date();
}
