import { Connection } from "typeorm";
import testConn from "../test-utils/testConn";
import { gCall } from "../test-utils/gCall";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { setupTestData } from "./setupTestData";

export let conn: Connection;
beforeAll(async () => {
    conn = await testConn();
});
afterAll(async () => {
    await conn.close();
});

// TODO: upgrade barcode/userId to SaleInput type
const saleMutation = `
mutation Sale($barcode: String!, $userId: Int!) {
    sale(
        barcode: $barcode,
        userId: $userId) {
        id
        userId
        productId
        createdAt
    }
}
`;

// ------------------------
describe('Scanning sales tests', () => {

    it('returns null if product not found', async () => {

        // at this point, DB is wiped clean, so no products
        const result = await gCall({
            source: saleMutation,
            variableValues: {
                barcode: "68151-4146",
                userId: 22
            }
        })
        await expect(result.data?.sale).toEqual(null);
    });

    it('returns sale record if product successfully scanned', async () => {
        const { testUser, testProduct }: { testUser: User; testProduct: Product; } =
            await setupTestData(conn);

        // run SUCCESSFUL sale against those
        const result = await gCall({
            source: saleMutation,
            variableValues: {
                barcode: "68151-4146",
                userId: testUser.id
            }
        })
        await expect(result.data?.sale).not.toEqual(null);
        await expect(result.data?.sale.userId).toEqual(testUser.id);
        await expect(result.data?.sale.productId).toEqual(testProduct.id);
    });



});

