import React, { useState, useEffect } from 'react';
// import ControleLivro from './ControleLivros';
// import ControleEditora from './ControleEditora';
import ControleEditora from './controle/ControleEditora';
import ControleLivros from './controle/ControleLivros';

function LinhaLivro({ livro, excluir }) {
  const controleEditora = new ControleEditora();

  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>
        <div>{livro.titulo}</div>
        <button className='btn btn-danger' onClick={() => excluir(livro.codigo)}>Excluir</button>
      </td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

function LivroLista() {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);
  const controleLivro = new ControleLivros();

  useEffect(() => {
    if (!carregado) {
      setLivros(controleLivro.obterLivros());
      setCarregado(true);
    }
  }, [carregado, controleLivro]);

  const excluir = (codigoLivro) => {
    controleLivro.excluir(codigoLivro);
    setCarregado(false);
  };

  return (
    <main className='mx-4'>
      <h1>Catálogo de Livros</h1>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>Título</th>
            <th scope='col'>Resumo</th>
            <th scope='col'>Editora</th>
            <th scope='col'>Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default LivroLista;
