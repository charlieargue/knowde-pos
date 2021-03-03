import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

// ------------------------
// J O I N     T A B L E  (explicit)
// ------------------------

@ObjectType()
@Entity()
export class Scan extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;


    // EXTRA COLUMNs
    // ------------------------
    @Field()
    @Column({ type: "float" })
    price!: number; // in case prices change and not managing that history

    // JOIN COLUMNS (FKs)
    // ------------------------
    @Field()
    @Column()
    userId: number; // i.e. cashier at register doing the scanning

    @Field()
    @Column()
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
