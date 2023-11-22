import { Injectable } from '@angular/core';
import { Livro } from './livro';

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {
  livros: Array<Livro>;

  constructor() {
    this.livros = [
      new Livro(1, 1, 'Livro 1', 'Resumo do Livro 1', ['Autor 1', 'Autor 2']),
      new Livro(2, 2, 'Livro 2', 'Resumo do Livro 2', ['Autor 3', 'Autor 4']),
      new Livro(3, 3, 'Livro 3', 'Resumo do Livro 3', ['Autor 5'])
    ];
  }

  obterLivros(): Array<Livro> {
    return this.livros;
  }

  incluir(livro: Livro): void {
    const novoCodigo = this.livros.reduce((max, livro) => (livro.codigo > max ? livro.codigo : max), 0) + 1;
    livro.codigo = novoCodigo;
    this.livros.push(livro);
  }

  excluir(codigo: number): void {
    const index = this.livros.findIndex(livro => livro.codigo === codigo);
    if (index !== -1) {
      this.livros.splice(index, 1);
    }
  }
}
