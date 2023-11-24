import React, { useState, useEffect } from 'react';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const LinhaLivro = ({ livro, excluir }) => {
  const controleEditora = new ControleEditora();
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  const handleExcluir = () => {
    excluir(livro.codigo);
  };

  return (
    <tr>
      <td>
        <div>{livro.titulo}</div>
        <button className='btn btn-danger' onClick={handleExcluir}>Excluir</button>
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
};

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);
  const controleLivro = new ControleLivros();

  const getLivros = () => {
    controleLivro.obterLivros()
      .then((livrosObtidos) => {
        setLivros(livrosObtidos);
      })
      .catch((error) => {
        console.error('Erro ao obter livros:', error);
      });
  }

  useEffect(() => {
    getLivros()
  }, []);

  const excluir = (codigoLivro) => {
    controleLivro.excluir(codigoLivro)
      .then(() => {
        setCarregado(false);
        getLivros();
      })
      .catch((error) => {
        console.error('Erro ao excluir livro:', error);
      });
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
            <LinhaLivro
              key={livro.codigo}
              livro={livro}
              excluir={excluir}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;
