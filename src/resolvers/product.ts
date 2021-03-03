import { Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Product } from '../entities/Product';

// JUST for debugging

@Resolver(Product)
export class ProductResolver {

    @Query(() => [Product])
    async products(
    ): Promise<Product[]> {

        const qb = getConnection()
            .getRepository(Product)
            .createQueryBuilder("p")
            .orderBy('p.name', "ASC")
            .take();
        return qb.getMany();
    }
}