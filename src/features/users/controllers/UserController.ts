import { Request, Response } from "express";
import { User } from "../../../core/data/database/entities/User";

export default class UserController {
  public async store(req: Request, res: Response) {
    const { nome, senha } = req.body;
    const userExistente: User | undefined = await User.findOne({
      where: [{ nome: nome }],
    });
    if (userExistente) {
      return res.status(400).json("User_exist");
    } else if (nome === undefined || nome === "") {
      return res.status(400).send("empty_fields");
    } else {
      const userNovo: User = await new User(nome, senha).save();
      return res.status(200).json(userNovo);
    }
  }

  public async index(req: Request, res: Response) {
    const users = await User.find({
      relations: ["mensagens"],
      select: ["nome", "senha", "uid"],
    });
    return res.json(users);
  }

  public async viewOne(req: Request, res: Response) {
    const { uid } = req.params;

    const user = await User.findOne(uid, {
      relations: ["mensagens"],
      select: ["nome", "senha", "uid"],
    });
    return res.status(200).send(user);
  }

  public async view(req: Request, res: Response) {
    const nome = req.query.nome;
    const senha = req.query.senha;
    // const { nome, senha } = req.body;

    const userExistente: User | undefined = await User.findOne({
      where: [{ nome: nome }],
      relations: ["mensagens"],
      select: ["nome", "senha", "uid"],
    });

    if (
      nome === undefined ||
      nome === null ||
      nome === "" ||
      senha === undefined ||
      senha === null ||
      senha === ""
    ) {
      return res.status(400).send("field_error");
    }
    if (!userExistente) {
      return res.status(400).send("user_not_exist");
    }
    if (userExistente.senha === senha) {
      return res.status(200).send(userExistente);
    } else {
      return res.status(400).send("senha_error");
    }

    // const user = await User.findOne(uid, {
    //   relations: ["mensagens"],
    //   select: ["nome", "senha", "uid"],
    // });

    // return res.json({ nome: user?.nome, senha: user?.senha, uid: user?.uid });
    // return res.json(user);

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
    } else {
      return res.status(400).send("Parâmetros faltando!");
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
  }
}
