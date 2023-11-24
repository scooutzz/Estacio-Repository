import { Menu } from '@/componentes/Menu';
import Livro from '@/modelo/Livros';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import LinhaLivro from '@/componentes/LinhaLivro';
import ControleLivros from '@/controle/ControleLivros';

const LivroLista: NextPage = () => {
  const controleLivros: ControleLivros = new ControleLivros();

  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    getLivros();
  }, []);

  const getLivros = () => {
    controleLivros.obterLivros().then((livros) => {
      setLivros(livros);
      setCarregado(true);
    }).catch((error) => {
      console.error('Erro ao buscar os livros:', error);
    });
  }

  const excluir = async (codigo: string | null): Promise<void> => {
    await controleLivros.excluir(codigo).then(() => {
      setCarregado(false);
      getLivros();
    })
  };

  return (
    <>
      <Head>
        <title>Livro Lista</title>
      </Head>

      <Menu />

      <main className={`${styles.main} container`}>
        <h1 className={styles.title}>Lista de Livros</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <LinhaLivro key={index} livro={livro} excluir={() => excluir(livro.codigo)} />
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default LivroLista