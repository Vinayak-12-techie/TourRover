const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException,', (err) => {
  console.log('UNCAUGHT EXCEPTION ! 😵‍💫 Shutting Down.....');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB Connected');
  });

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION ! 😵‍💫 Shutting Down.....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
