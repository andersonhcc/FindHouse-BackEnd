import express from 'express';
import routes from './routes';
import path from 'path';
import mongoose from 'mongoose';

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