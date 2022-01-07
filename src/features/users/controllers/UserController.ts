import { Request, Response } from "express";

import { User } from "../../../core/data/database/entities/user";

export default class UserController {
  public async store(req: Request, res: Response) {
    const { nome, senha } = req.body;

    const userExistente: User | undefined = await User.findOne({
      where: [{ name: nome }],
    });

    if (userExistente) {
      return res.status(400).send("Usuário já cadastrado!");
    } else {
      const userNovo: User = await new User(nome, senha).save();
      const userCriado: object = { nome: userNovo.nome, senha: userNovo.senha };
      return res.status(200).json(userCriado);
    }
  }

  public async index(req: Request, res: Response) {
    const nome = req.query.nome;
    const senha = req.query.senha;

    const userExistente: User | undefined = await User.findOne({
      where: [{ name: nome }],
    });

    if (!userExistente) {
      return res
        .status(400)
        .send("Usuário não existe ou não pode ser encontrado!");
    }

    if (userExistente.senha === senha) {
      return res.status(200).send(`${userExistente.uid}`);
    } else {
      return res
        .status(400)
        .send("Ocorreu um erro ao tentar gravar o usuário no banco de dados");
    }
  }

  public async viewUsers(req: Request, res: Response) {
    const users = await User.find();

    return res.status(200).json(users);
  }

  public async view(req: Request, res: Response) {
    const user_uid: number = Number(req.params.idUser);

    const userProcurado: User | undefined = await User.findOne({
      where: [{ uid: user_uid }],
    });

    if (userProcurado) {
      const userEncontrado: object = {
        nome: userProcurado.nome,
        senha: userProcurado.senha,
      };
      return res.status(200).json(userEncontrado);
    } else {
      return res.status(400).send("Erro ao buscar usuário!");
    }
  }

  public async update(req: Request, res: Response) {
    const user_uid: number = Number(req.params.idUser);
    const { nome, senha }: { nome: string; senha: string } = req.body;

    if (user_uid && nome && senha) {
      const userProcurado: User | undefined = await User.findOne({
        where: [{ uid: user_uid }],
      });

      if (userProcurado) {
        userProcurado.nome = nome;
        userProcurado.senha = senha;
        await User.save(userProcurado);

        const userEditado: object = { nome: nome, senha: senha };
        return res.status(200).json(userEditado);
      } else {
        return res.status(400).send("Usuário não pode ser encontrado!");
      }
    } else {
      return res.status(400).send("Falha nas informações apresentadas!");
    }
  }

  public async destroy(req: Request, res: Response) {
    const user_uid: number = Number(req.params.idUser);

    if (user_uid) {
      const userProcurado: User | undefined = await User.findOne({
        where: [{ uid: user_uid }],
      });

      if (userProcurado) {
        const userEncontrado: object = {
          nome: userProcurado.nome,
          senha: userProcurado.senha,
        };
        const remove = await User.remove(userProcurado);
        return res.status(200).json(userEncontrado);
      } else {
        return res
          .status(400)
          .send("Usuário não existe ou não pode ser encontrado!");
      }
    } else {
      return res.status(400).send("Falha nas informações apresentadas!");
    }
  }
}
