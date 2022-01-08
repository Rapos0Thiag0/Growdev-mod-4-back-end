import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class mensagem1641427308708 implements MigrationInterface {
  private tabelaMensagens: Table = new Table({
    name: "mensagens",
    columns: [
      {
        name: "uid",
        type: "uuid",
        isPrimary: true,
        isNullable: false,
      },
      {
        name: "descricao",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "detalhamento",
        type: "varchar",
        length: "200",
        isNullable: false,
      },
      {
        name: "created_at",
        type: "timestamp",
        isNullable: false,
      },
      {
        name: "updated_at",
        type: "timestamp",
        isNullable: false,
      },
      {
        name: "user_uid",
        type: "uuid",
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.tabelaMensagens);

    await queryRunner.createForeignKey(
      "mensagens",
      new TableForeignKey({
        columnNames: ["user_uid"],
        referencedColumnNames: ["uid"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("mensagens");
  }
}
