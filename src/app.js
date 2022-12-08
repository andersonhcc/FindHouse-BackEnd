import express from 'express';
import routes from './routes';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors'; //serve para limitar quem pode acessar nossa api;

class App {
  constructor() {
      this.server = express();

      mongoose.connect('mongodb+srv://findhouse:findhouse@findhouse.xnqqtqm.mongodb.net/findhouse?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.middleware();
      this.routes();
  }

  middleware(){
    this.server.use(cors());  //origin é o método q utilizamos para colocar que um único domínio pode acessar.
    
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname,'..', 'uploads'))
    );
    this.server.use(express.json());
  }

  routes () {
    this.server.use(routes);
  }
}

export default new App().server;