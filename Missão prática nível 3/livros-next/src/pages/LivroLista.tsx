import { Menu } from '@/componentes/Menu';
import Livro from '@/modelo/Livros';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import LinhaLivro from '@/componentes/LinhaLivro';

const LivroLista: NextPage = () => {
  const baseURL = 'http://localhost:3000/api/livros';
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  const obter = async (): Promise<void> => {
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      setLivros(data);
      setCarregado(true);
    } catch (error) {
      console.error('Erro ao carregar os livros:', error);
    }
  };

  const excluirLivro = async (codigo: number): Promise<boolean> => {
    try {
      const response = await fetch(`${baseURL}/${codigo}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Erro ao excluir o livro:', error);
      return false;
    }
  };

  const excluir = async (codigo: number) => {
    const sucesso = await excluirLivro(codigo);
    if (sucesso) {
      setCarregado(false);
    }
  };

  useEffect(() => {
    obter();
  }, []);

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
            {livros.map((livro) => (
              <LinhaLivro key={livro.codigo} livro={livro} excluir={() => excluir(livro.codigo)} />
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default LivroLista