import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToOne,
  BeforeUpdate,
  BeforeInsert,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "./User";

@Entity({ name: "mensagens" })
export class Mensagem extends BaseEntity {
  @PrimaryColumn()
  uid?: string;

  @Column()
  descricao: string;

  @Column()
  detalhamento: string;

  @Column()
  user_uid: string;

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.mensagens)
  @JoinColumn({ name: "user_uid" })
  user?: User;

  constructor(
    descricao: string,
    detalhamento: string,
    user_uid: string,
    user: User,
    uid?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super();
    this.descricao = descricao;
    this.detalhamento = detalhamento;
    this.user_uid = user_uid;
    this.user = user;
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
