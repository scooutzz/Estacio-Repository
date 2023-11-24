const db = require('./conexao')

const LivroSchema = new db.Schema({
  id: db.Schema.Types.ObjectId,
  titulo: String,
  codEditora: Number,
  resumo: String,
  autores: [String]
});

const Livro = db.model('livros', LivroSchema); // 'livros' é o nome da coleção no MongoDB

module.exports = Livro;

