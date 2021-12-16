import Mongoose from 'mongoose';

const db = 'mongodb://localhost/pyatkh-bot';

const connect = () => Mongoose.connect(
  db,
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  },
);

const disconnect = () => Mongoose.disconnect();

export default {
  connect,
  disconnect,
};
