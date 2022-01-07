import { Entity, BaseEntity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { Mensagem } from "./mensagem";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryColumn()
  uid?: number;

  @Column()
  nome: string;

  @Column()
  senha: string;

  @OneToMany(() => Mensagem, (mensagem) => mensagem.user)
  mensagem?: Mensagem[];

  constructor(nome: string, senha: string) {
    super();
    this.nome = nome;
    this.senha = senha;
  }
}
