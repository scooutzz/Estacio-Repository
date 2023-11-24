import type { NextPage } from 'next';
import React, { useState } from 'react';
import ControleEditora from '@/controle/ControleEditora';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import Livro from '@/modelo/Livros';
import Head from 'next/head';
import { Menu } from '@/componentes/Menu';
import ControleLivros from '@/controle/ControleLivros';

const LivroDados: NextPage = () => {
  const controleEditora: ControleEditora = new ControleEditora();
  const controleLivros = new ControleLivros();

  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(0);

  const router = useRouter();


  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = Number(event.target.value);
    setCodEditora(value);
  };

  const incluir = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const livro: Livro = {
      codigo: null,
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora
    };

    controleLivros.incluir(livro).then(() => {
      router.push('/LivroLista');
    });
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