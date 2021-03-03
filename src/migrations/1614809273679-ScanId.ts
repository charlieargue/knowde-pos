import {MigrationInterface, QueryRunner} from "typeorm";

export class ScanId1614809273679 implements MigrationInterface {
    name = 'ScanId1614809273679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scan" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "PK_08773559781331e35529da3661e"`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "PK_20847212612983386aed855e415" PRIMARY KEY ("userId", "productId", "id")`);
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "FK_33ca53a4afbb010e0826b922867"`);
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "FK_167516dc391092274fa5d2f02af"`);
        await queryRunner.query(`COMMENT ON COLUMN "scan"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "PK_20847212612983386aed855e415"`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "PK_644cb4bdf535919b3e0a50c27fa" PRIMARY KEY ("productId", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "scan"."productId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "PK_644cb4bdf535919b3e0a50c27fa"`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "PK_9868a638d0569ba3fe3bddcef84" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "FK_33ca53a4afbb010e0826b922867" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "FK_167516dc391092274fa5d2f02af" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "FK_167516dc391092274fa5d2f02af"`);
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "FK_33ca53a4afbb010e0826b922867"`);
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "PK_9868a638d0569ba3fe3bddcef84"`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "PK_644cb4bdf535919b3e0a50c27fa" PRIMARY KEY ("productId", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "scan"."productId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "PK_644cb4bdf535919b3e0a50c27fa"`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "PK_20847212612983386aed855e415" PRIMARY KEY ("userId", "productId", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "scan"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "FK_167516dc391092274fa5d2f02af" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "FK_33ca53a4afbb010e0826b922867" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "PK_20847212612983386aed855e415"`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "PK_08773559781331e35529da3661e" PRIMARY KEY ("userId", "productId")`);
        await queryRunner.query(`ALTER TABLE "scan" DROP COLUMN "id"`);
    }

}
