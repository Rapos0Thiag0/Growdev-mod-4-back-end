import { Request, Response } from "express";

import { User } from "../../../core/data/database/entities/User";

export default class UserController {
  public async store(req: Request, res: Response) {
    const { nome, senha } = req.body;

    const user = await new User(nome, senha).save();

    console.log(user);

    return res.status(200).send("usuário criado");

    // const userExistente: User | undefined = await User.findOne({
    //   where: [{ nome: nome }],
    // });

    // if (userExistente) {
    //   return res.status(400).send("Usuário já cadastrado!");
    // } else {
    //   const userNovo: User = await new User(nome, senha).save();
    //   // const userCriado: object = { nome: userNovo.nome, senha: userNovo.senha };
    //   return res.status(200).json(userNovo);
    // }
  }

  public async index(req: Request, res: Response) {
    const users = await User.find();

    return res.json(users);

    // const userExistente: User | undefined = await User.findOne({
    //   where: [{ nome: nome }],
    // });

    // if (!userExistente) {
    //   return res
    //     .status(400)
    //     .send("Usuário não existe ou não pode ser encontrado!");
    // }

    // if (userExistente.senha === senha) {
    //   return res.status(200).send(`${userExistente.uid}`);
    // } else {
    //   return res
    //     .status(400)
    //     .send("Ocorreu um erro ao tentar gravar o usuário no banco de dados");
    // }
  }

  // public async viewUsers(req: Request, res: Response) {
  //   const users = await User.find();

  //   return res.status(200).json(users);
  // }

  public async view(req: Request, res: Response) {
    const { uid } = req.params;

    const user = await User.findOne(uid);

    return res.json(user);

    // const userProcurado: User | undefined = await User.findOne({
    //   where: [{ uid: user_uid }],
    // });

    // if (userProcurado) {
    //   const userEncontrado: object = {
    //     nome: userProcurado.nome,
    //     senha: userProcurado.senha,
    //   };
    //   return res.status(200).json(userEncontrado);
    // } else {
    //   return res.status(400).send("Erro ao buscar usuário!");
    // }
  }

  public async update(req: Request, res: Response) {
    const { uid } = req.params;

    const { nome, senha } = req.body;

    const user = await User.findOne(uid);

    if (nome && senha && user) {
      const user = await new User(nome, senha, uid).save();
      console.log(user);
      return res.status(200).send("Usuário atualizado com sucesso!");
      // const userProcurado: User | undefined = await User.findOne({
      //   where: [{ uid: user_uid }],
      // });

      // if (userProcurado) {
      //   userProcurado.nome = nome;
      //   userProcurado.senha = senha;
      //   await User.save(userProcurado);

      //   const userEditado: object = { nome: nome, senha: senha };
      //   return res.status(200).json(userEditado);
      // } else {
      //   return res.status(400).send("Usuário não pode ser encontrado!");
      // }
    } else {
      return res.status(400).send("Parâmmetros faltando!");
    }
  }

  public async destroy(req: Request, res: Response) {
    const { uid } = req.params;

    const userRemoved = await User.findOne(uid);

    if (userRemoved) {
      const result = await User.remove(userRemoved);
      console.log(result);
      return res.status(200).send("Usuário deletado com sucesso!");
    } else {
      return res.status(400).send("Usuário não encontrado!");
    }

    // if (user_uid) {
    //   const userProcurado: User | undefined = await User.findOne({
    //     where: [{ uid: user_uid }],
    //   });

    //   if (userProcurado) {
    //     const userEncontrado: object = {
    //       nome: userProcurado.nome,
    //       senha: userProcurado.senha,
    //     };
    //     const remove = await User.remove(userProcurado);
    //     return res.status(200).json(userEncontrado);
    //   } else {
    //     return res
    //       .status(400)
    //       .send("Usuário não existe ou não pode ser encontrado!");
    //   }
    // } else {
    //   return res.status(400).send("Falha nas informações apresentadas!");
    // }
  }
}
