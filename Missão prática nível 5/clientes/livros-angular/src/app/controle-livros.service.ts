import { Injectable } from '@angular/core';
import { Livro } from './livro';

export interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {
  baseURL = "http://localhost:3030/livros";

  constructor() {}

  async obterLivros() {
    const response = await fetch(this.baseURL);
    if (!response.ok) {
      throw new Error('Erro ao buscar os livros');
    }
    const livrosMongo: LivroMongo[] = await response.json();
    const livros: Array<Livro> = livrosMongo.map((livro) => ({
      codigo: livro._id,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    }));

    return livros;
  }

  async incluir(livro: Livro) {
    const livroMongo: LivroMongo = {
      _id: null,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };

    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livroMongo),
    });

    return response.ok;
  }

  async excluir(codigo: string) {
    const response = await fetch(`${this.baseURL}/${codigo}`, {
      method: 'DELETE',
    });

    return response.ok;
  }
}
