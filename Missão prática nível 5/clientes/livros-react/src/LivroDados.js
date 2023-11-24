import React, { useState } from 'react';
import ControleEditora from './controle/ControleEditora';
import ControleLivros from './controle/ControleLivros';
import { useNavigate } from 'react-router-dom';

function LivroDados() {
  const controleLivro = new ControleLivros();
  const controleEditora = new ControleEditora();
  const navigate = useNavigate();

  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);

  const tratarCombo = (event) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event) => {
    event.preventDefault();
    const novoLivro = {
      codigo: '',
      codEditora: codEditora,
      titulo: titulo,
      resumo: resumo,
      autores: autores.split('\n').map((autor) => autor.trim()),
    };
    controleLivro.incluir(novoLivro).then(() => {
      navigate('/');
    });
  };

  return (
    <main className='mx-4'>
      <h1>Cadastro de Livro</h1>
      <form onSubmit={incluir}>
        <div className='form-group mb-4'>
          <label>Título:</label>
          <input
            className='form-control'
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className='form-group mb-4'>
          <label>Resumo:</label>
          <textarea
            className='form-control'
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
          ></textarea>
        </div>
        <div className='form-group mb-4'>
          <label>Editora:</label>
          <select className='form-control' value={codEditora} onChange={tratarCombo}>
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group mb-4'>
          <label>Autores (1 por linha):</label>
          <textarea
            className='form-control'
            value={autores}
            onChange={(e) => setAutores(e.target.value)}
          ></textarea>
        </div>
        <div className='form-group'>
          <button className='btn btn-primary' type="submit">Adicionar Livro</button>
        </div>
      </form>
    </main>
  );
}

export default LivroDados;
