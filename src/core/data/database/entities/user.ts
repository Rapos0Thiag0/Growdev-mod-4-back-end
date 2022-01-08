import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Mensagem } from "./Mensagem";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryColumn()
  uid?: string;

  @Column()
  nome: string;

  @Column()
  senha: string;

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;

  @OneToMany(() => Mensagem, (mensagem) => mensagem.user)
  mensagem?: Mensagem[];

  constructor(
    nome: string,
    senha: string,
    uid?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super();
    this.nome = nome;
    this.senha = senha;
    this.uid = uid;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @BeforeInsert()
  private BeforeInsert() {
    console.log("before insert");
    this.uid = uuid();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  private beforeUpdate() {
    console.log("before update");
    this.updatedAt = new Date();
  }
}
