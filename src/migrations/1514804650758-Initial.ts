import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1614804650758 implements MigrationInterface {
    name = 'Initial1614804650758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "scan" ("price" double precision NOT NULL, "userId" integer NOT NULL, "productId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_08773559781331e35529da3661e" PRIMARY KEY ("userId", "productId"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "barcode" character varying NOT NULL, "name" character varying NOT NULL, "price" double precision NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "FK_33ca53a4afbb010e0826b922867" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scan" ADD CONSTRAINT "FK_167516dc391092274fa5d2f02af" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "FK_167516dc391092274fa5d2f02af"`);
        await queryRunner.query(`ALTER TABLE "scan" DROP CONSTRAINT "FK_33ca53a4afbb010e0826b922867"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "scan"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
