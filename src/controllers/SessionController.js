//métodos : index, show, update, store, destroy

/* 
index: listagem de sessões
store: criar uma nova sessão (fazer um novo login, cadastro)
show: listar uma única sessão 
update: atualizar uma sessão (quando queremos alterar alguma sessão)
destroy: deeletar uma sessão

*/

import User from "../models/User";

class SessionController {
  
  async store(req,res){
    const { email } = req.body;

    //verificando se o usuário já existe

    let user = await User.findOne({ email });

    if(!user){
      user = await User.create({ email });
    }

    return res.json(user)
  }

}

export default new SessionController();
