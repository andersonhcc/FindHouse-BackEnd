import House from '../models/House';
import User from '../models/User';
import * as yup from 'yup';



class HouseController {

  async index(req,res) {
    const { status} = req.query; // pegando o status do query na api;

    const houses = await House.find({ status });
    // buscando toddas as casas que tem status (true ou false, defino na api)

    return res.json(houses);

    // retorno todas as coisas de acordo com oq escolhi

  }

  
  async store(req, res) {
    const schema = yup.object().shape({
      description: yup.string().required(),
      price: yup.number().required(),
      location: yup.string().required(),
      status: yup.boolean().required(),
    })
    
    const { filename } = req.file;
    const {description, price, location, status} = req.body;
    const { user_id} = req.headers;

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Falha na validação'})
    }

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,

    })
    
    return res.json(house); 
}

  async update(req,res) {
    const { filename } = req.file; // pegando a imagem
    const { house_id} = req.params; // pegando o id da casa
    const {description, price, location, status} = req.body; // pegando as informações do body
    const { user_id} = req.headers; // pegando id do usuário para verificação

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if(String(user._id) !== String(houses.user)){
      return res.status(401).json({ error: 'Não autorizado.'});
    }

     await House.updateOne({_id: house_id}, { //quero editar uma, por isso updateOne, esse {{_id: house_id}} é por conta que é para localizar a casa que estamos mandando
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });
    
    return res.json({ message: 'Atualizado com sucesso' });

  }

  async delete(req,res){
    const { house_id} = req.body;
    const { user_id } = req.headers;
    
    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if(String(user._id) !== String(houses.user)){
      return res.status(401).json({ error: 'Não autorizado.'});
    }



    await House.findByIdAndDelete({_id: house_id});

    return res.json({message: 'Deletada com sucesso'})


  }

}

export default new HouseController();