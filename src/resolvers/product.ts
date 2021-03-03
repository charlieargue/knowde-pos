import { Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Product } from '../entities/Product';

@Resolver(Product)
export class ProductResolver {

    @Query(() => [Product])
    async products(
    ): Promise<Product[]> {

        // using TypeORM's query builder 
        const qb = getConnection()
            .getRepository(Product)
            .createQueryBuilder("p")
            .orderBy('p.name', "ASC")
            .take();
        return qb.getMany();
    }
}