import type { NextPage } from 'next';
import React, { useState } from 'react';
import ControleEditora from '@/controle/ControleEditora';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import Livro from '@/modelo/Livros';
import Head from 'next/head';
import { Menu } from '@/componentes/Menu';

const LivroDados: NextPage = () => {
  const baseURL = 'http://localhost:3000/api/livros';
  const controleEditora: ControleEditora = new ControleEditora();

  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(0);

  const router = useRouter();

  const incluirLivro = async (livro: Livro): Promise<boolean> => {
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro),
      });
      return response.ok;
    } catch (error) {
      console.error('Erro ao incluir o livro:', error);
      return false;
    }
  };

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = Number(event.target.value);
    setCodEditora(value);
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const livro: Livro = {
      codigo: 0,
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora,
    };

    const sucesso = await incluirLivro(livro);
    if (sucesso) {
      router.push('/LivroLista');
    }
  };

  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  return (
    <div className={styles.container}>
      <Head>
        <title>Livro Dados</title>
      </Head>

      <Menu />

      <main className={`${styles.main} container`}>
        <h1 className={styles.title}>Inclusão de Livro</h1>
        <form onSubmit={incluir}>
          <div className='form-group mb-4'>
            <label>Título:</label>
            <input className='form-control' type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </div>
          <div className='form-group mb-4'>
            <label>Resumo:</label>
            <textarea className='form-control' value={resumo} onChange={(e) => setResumo(e.target.value)} />
          </div>
          <div className='form-group mb-4'>
            <label>Autores:</label>
            <textarea className='form-control' value={autores} onChange={(e) => setAutores(e.target.value)} />
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
          <button className='btn btn-primary' type="submit">Adicionar Livro</button>
        </form>
      </main>
    </div>
  );
}

export default LivroDados