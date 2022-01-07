import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1641427277424 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "uid",
            type: "interger",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "nome",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "senha",
            type: "varchar",
            length: "12",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
