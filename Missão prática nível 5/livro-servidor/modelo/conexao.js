const mongoose = require("mongoose");

// string de conexão passando como parâmetro o nome do banco de dados
mongoose
  .connect(
    "mongodb://fabio:123qwe@127.0.0.1:27017/?authMechanism=DEFAULT&directConnection=true", {dbName: 'livraria'}
  )
  .then(() => {
    console.log("Conectado ao MongoDB!");
  })
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

module.exports = mongoose;
