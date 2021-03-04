import { Connection } from "typeorm";
import { Product } from "../entities/Product";
import { User } from "../entities/User";

export async function setupTestData(conn: Connection) {

    // insert a test user
    const testUser: User = (await conn
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
            {
                username: "crashdummy",
                email: "crash@dummy",
                password: "123456"
            }
        ])
        .returning("*")
        .execute()).raw[0];


    // insert a test product
    const testProduct: Product = (await conn
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values([
            {
                barcode: "68151-4146",
                name: "Bagel - Sesame Seed Presliced",
                price: 1.23,
            }
        ])
        .returning("*")
        .execute()).raw[0];
    return { testUser, testProduct };
}
