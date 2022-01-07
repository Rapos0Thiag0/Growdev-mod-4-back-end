import { Entity, BaseEntity, PrimaryColumn, Column, OneToOne } from "typeorm";

import { User } from "./user";

@Entity({ name: "mensagens" })
export class Mensagem extends BaseEntity {
  @PrimaryColumn()
  uid?: number;

  @Column()
  descricao: string;

  @Column()
  detalhamento: string;

  @Column()
  user_uid: number;

  @OneToOne(() => User, (user) => user.mensagem)
  user?: User;

  constructor(descricao: string, detalhamento: string, user_uid: number) {
    super();
    this.descricao = descricao;
    this.detalhamento = detalhamento;
    this.user_uid = user_uid;
  }
}
