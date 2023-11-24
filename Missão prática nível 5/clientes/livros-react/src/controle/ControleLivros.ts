import Livro from "../modelo/Livros";

const baseURL = "http://localhost:3030/livros";

interface LivroMongo {
  _id: string | null,
  codEditora: number,
  titulo: string,
  resumo: string,
  autores: string[]
}

class ControleLivros {

  async obterLivros() {
    const response = await fetch(baseURL);
    const livrosMongo: LivroMongo[] = await response.json();

    const livros: Livro[] = livrosMongo.map((livro) => ({
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

    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livroMongo),
    });

    return response.ok;
  }

  async excluir(codigo: number) {
    const response = await fetch(`${baseURL}/${codigo}`, {
      method: 'DELETE',
    });

    return response.ok;
  }
}

export default ControleLivros;
