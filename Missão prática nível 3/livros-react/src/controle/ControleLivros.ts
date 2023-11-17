import Livro from "../modelo/Livros";

const livros: Array<Livro> = [
    new Livro(1, 1, 'Livro 1', 'Resumo do Livro 1', ['Autor 1', 'Autor 2']),
    new Livro(2, 2, 'Livro 2', 'Resumo do Livro 2', ['Autor 3']),
    new Livro(3, 3, 'Livro 3', 'Resumo do Livro 3', ['Autor 4', 'Autor 5'])
];

class ControleLivros {
  private livros: Array<Livro>;

  constructor() {
    this.livros = livros;
  }

  obterLivros(): Array<Livro> {
    return this.livros;
  }

  incluir(livro: Livro) {
    const codigoMaisAlto = Math.max(...this.livros.map(livro => livro.codigo));
    livro.codigo = codigoMaisAlto + 1;
    this.livros.push(livro);
  }

  excluir(codigo: number) {
    const index = this.livros.findIndex(livro => livro.codigo === codigo);
    if (index !== -1) {
      this.livros.splice(index, 1);
    }
  }
}

export default ControleLivros;
