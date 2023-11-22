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
    this.editoras = this.servEditoras.getEditoras();
    this.livros = this.servLivros.obterLivros();
  }

  excluir = (codigoLivro: number) => {
    this.servLivros.excluir(codigoLivro);
    this.livros = this.servLivros.obterLivros();
  }

  obterNome = (codEditora: number) => {
    return this.servEditoras.getNomeEditora(codEditora);
  }

}
