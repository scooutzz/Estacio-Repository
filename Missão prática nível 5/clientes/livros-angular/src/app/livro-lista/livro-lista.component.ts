import { Component, OnInit } from '@angular/core';
import { Editora } from '../editora';
import { Livro } from '../livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  editoras: Array<Editora> = [];
  livros: Array<Livro> = [];

  constructor(
    private servEditoras: ControleEditoraService,
    private servLivros: ControleLivrosService
  ) { }

  ngOnInit(): void {
    this.servLivros.obterLivros().then((livros: Livro[]) => {
      this.livros = livros;
    });
  }

  excluir(codigo: string) {
    this.servLivros.excluir(codigo).then((result: boolean) => {
      if (result) {
        this.servLivros.obterLivros().then((livros: Livro[]) => {
          this.livros = livros;
        });
      }
    });
  }

  obterNome = (codEditora: number) => {
    return this.servEditoras.getNomeEditora(codEditora);
  }

}
