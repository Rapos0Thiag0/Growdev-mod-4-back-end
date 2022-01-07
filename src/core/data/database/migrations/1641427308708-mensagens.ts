import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Mensagens1641427308708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mensagens",
        columns: [
          {
            name: "uid",
            type: "integer",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "descricao",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "detalhamento",
            type: "varchar",
            length: "200",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("mensagens");
  }
}
