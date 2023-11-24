const express = require('express');
const livroDAO = require('../modelo/livro-dao')

const router = express.Router();

router.get('/', async (req, res) => {
  const livros = await livroDAO.obterLivros();
  res.json(livros);
});

router.post('/', async (req, res) => {
  const livro = req.body;
  await livroDAO.incluir(livro);
  res.json(livro);
});

router.delete('/:_id', async (req, res) => {
  const codigo = req.params._id;
  await livroDAO.excluir(codigo);
  res.json(codigo);
});

module.exports = router;