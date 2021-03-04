import { User } from "../entities/User";
import { productTestData } from "../test-data/product-test-data";
import { userTestData } from "../test-data/user-test-data";
import { Connection } from "typeorm";
import { Product } from "../entities/Product";

export async function setupTestData(conn: Connection) {

    // insert test users
    await conn.query(productTestData);
    await conn.query(userTestData);
    
    // send back first user and product
    const testUser = (await User.find({}))[0];
    const testProduct = (await Product.find({}))[0];
        
    return { testUser, testProduct };
}
