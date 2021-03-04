import { productTestData } from "../test-data/product-test-data";
import { userTestData } from "../test-data/user-test-data";
import { MigrationInterface, QueryRunner } from "typeorm";
import sleep from "../utils/sleep";

export class DataHydration1615804326680 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // hacky: dodging error when these are run too quickly after initial create-tables
        await sleep(4000);
        await queryRunner.query(productTestData);
        await queryRunner.query(userTestData);
    }

    public async down(
        // queryRunner: QueryRunner
    ): Promise<void> {
    }

}
