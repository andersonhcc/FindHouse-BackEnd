import { Schema, model} from "mongoose";


const UserSchema = new Schema({ //quais campos vai ter nessa tabela?
  email: String,
});


export default model('User', UserSchema);