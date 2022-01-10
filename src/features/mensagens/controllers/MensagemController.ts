import { Request, Response } from "express";
import { Mensagem } from "../../../core/data/database/entities/Mensagem";
import { User } from "../../../core/data/database/entities/User";

export default class MensagemController {
  public async store(req: Request, res: Response) {
    const { user_uid } = req.params;
    const { descricao, detalhamento } = req.body;
    const user = await User.findOne(user_uid);

    if (user) {
      const mensagem = await new Mensagem(
        descricao,
        detalhamento,
        user_uid,
        user
      ).save();
      console.log(mensagem);
      return res.status(200).send("Mensagem criada!");
    } else {
      return res.status(400).send("Usuário não encontrdo!");
    }
  }

  public async index(req: Request, res: Response) {
    // const mensagens = await Mensagem.find({
    //   select: ["descricao", "detalhamento", "uid"],
    // });
    // return res.status(200).json(mensagens);
    const { user_uid } = req.params;
    const userMensagens = await Mensagem.find({
      where: [{ user_uid: user_uid }],
      select: ["descricao", "detalhamento", "uid"],
    });

    return res.status(200).json(userMensagens);
  }

  public async view(req: Request, res: Response) {
    const { uid } = req.params;

    const mensagens = await Mensagem.findOne(uid, {
      select: ["descricao", "detalhamento", "uid"],
    });
    if (mensagens) {
      const descricao = mensagens.descricao;
      const detalhamento = mensagens.detalhamento;
      const uid = mensagens.uid;
      const msg = {
        descricao: descricao,
        detalhamento: detalhamento,
        uid: uid,
      };
      console.log(msg);
      return res.status(200).json(msg);
    }
  }

  public async update(req: Request, res: Response) {
    const { user_uid } = req.params;
    const { uid } = req.params;

    const { descricao, detalhamento } = req.body;

    const user = await User.findOne(user_uid);
    const mensagem = await Mensagem.findOne(uid);

    if (descricao && detalhamento && user && mensagem) {
      const mensagem = await new Mensagem(
        descricao,
        detalhamento,
        user_uid,
        user,
        uid
      ).save();
      console.log(mensagem);
      return res.status(200).send("Mensagem ataualizada com sucesso!");
    } else {
      return res.status(400).send("Parâmmetros faltando!");
    }

    // const userMensagens = await Mensagem.find({
    //   where: [{ user_uid: user }],
    // });

    // if (user && mensagem && descricao && detalhamento) {
    //   const mensagemProcurada: Mensagem | undefined = await Mensagem.findOne({
    //     where: [{ uid: mensagem }],
    //   });

    // if (mensagemProcurada) {
    //   mensagemProcurada.descricao = descricao;
    //   mensagemProcurada.detalhamento = detalhamento;
    //   await Mensagem.save(mensagemProcurada);
    //   const mensagemEditada: object = {
    //     descricao: descricao,
    //     detalhamento: detalhamento,
    //   };
    //   return res.status(200).json(mensagemEditada);
    // } else {
    //   return res.status(400).send("Mensagem não pode ser encontrado!");
    // }
    // } else {
    //   return res.status(400).send("Falha nas informações apresentadas!");
    // }
  }

  public async destroy(req: Request, res: Response) {
    const { uid, user_uid } = req.params;

    const user = await User.findOne(user_uid);
    const mensagem = await Mensagem.findOne(uid);

    if (user && mensagem) {
      const mensagemRemoved = await Mensagem.findOne(uid);
      if (mensagemRemoved) {
        const result = await Mensagem.remove(mensagemRemoved);
        console.log(result);
        return res.status(200).send("Mensagem deletada com sucesso!");
      } else {
        return res.status(400).send("Mensagem não encontrada!");
      }
    } else {
      return res.status(400).send("Parâmetros faltando!!");
    }
  }
}
