import { Product } from '../entities/Product';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Scan } from '../entities/Scan';
import toOutputLCD from '../utils/toOutputLCD';
import toOutputPRINTER from '../utils/toOutputPRINTER';

@Resolver(Scan)
export class ScanResolver {


    // ------------------------ SALE
    @Mutation(() => [Scan], { nullable: true })
    async sale(
        @Arg('userId', () => Int) userId: number,       // i.e. user doing the barcode scanning
        @Arg('barcode', () => String) barcode: string,
    ): Promise<Scan | null | Error> {

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
            return new Error('Error occurred during sale');

            // TODO: better error handling responses i.e. return: 
            // SaleResponse {
            //   errors?: FieldError[],
            //   scan?: Scan,
            // }
        }
    }

    // ------------------------ EXIT
    @Query(() => Boolean, { nullable: true })
    async exit(
    ): Promise<null> {

        const scans = await getConnection()
            .getRepository(Scan)
            .createQueryBuilder("s")
            .leftJoinAndSelect("s.product", "product")
            .getMany();

        const { sum } = await getConnection()
            .getRepository(Scan)
            .createQueryBuilder("s")
            .select("SUM(price)", "sum")
            .getRawOne();

        // send to printer
        for (let scan of scans) {
            await toOutputPRINTER(
                `USERID: ${scan.userId}|PRODUCT: ${scan.product.name} (#${scan.product.id})|SCAN PRICE: $${scan.price}`
            );
        }
        await toOutputPRINTER(`----------------------------------------`);
        await toOutputPRINTER(`TOTAL: $${sum}`);

        // send to LCD
        await toOutputLCD(`TOTAL: $${sum}`);

        return null;
    }

    // ------------------------ 
    @Query(() => [Scan])
    async scans(
    ): Promise<Scan[]> {

        const qb = getConnection()
            .getRepository(Scan)
            .createQueryBuilder("s")
            .leftJoinAndSelect("s.product", "product")
            .orderBy('s.createdAt', "DESC")
            .take();
        return qb.getMany();
    }


}