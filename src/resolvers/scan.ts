import { Product } from '../entities/Product';
import { Arg, Int, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Scan } from '../entities/Scan';
import toOutputLCD from '../utils/toOutputLCD';

@Resolver(Scan)
export class ScanResolver {

    @Mutation(() => [Scan], { nullable: true })
    async sale(
        @Arg('userId', () => Int) userId: number,       // i.e. user doing the barcode scanning
        @Arg('barcode', () => String) barcode: string,
    ): Promise<Scan | null> {

        console.log("🚀 ~ barcode", barcode);
        try {

            const foundProduct = await getConnection()
                .getRepository(Product)
                .createQueryBuilder("product")
                .where("product.barcode = :barcode", { barcode })
                .getOne();

            if (foundProduct) {

                const savedScan = await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Scan)
                    .values([
                        { price: foundProduct.price, userId, productId: foundProduct.id }
                    ])
                    .returning("*")
                    .execute();

                await toOutputLCD(`${foundProduct.name} $${foundProduct.price}`);

                return savedScan.raw as Scan;
            } else {

                await toOutputLCD(`Product not found`);
            }
            return null;

        } catch (err) {
            console.log("🚀 ~ err", err)
            return err;
        }
    }



}