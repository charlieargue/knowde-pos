import { Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';


@Resolver(User)
export class UserResolver {

    @Query(() => [User])
    async users(
    ): Promise<User[]> {

        const qb = getConnection()
            .getRepository(User)
            .createQueryBuilder("u")
            .orderBy('u.email', "ASC")
            .take();
        return qb.getMany();
    }
}