import { Injectable } from '@angular/core';
import { Editora } from './editora';

@Injectable({
  providedIn: 'root'
})
export class ControleEditoraService {
  editoras: Array<Editora>;

  constructor() {
    this.editoras = [
      {codEditora: 1, nome: 'Editora 1'},
      {codEditora: 2, nome: 'Editora 2'},
      {codEditora: 3, nome: 'Editora 3'}
    ]
  }

  getEditoras(): Array<Editora> {
    return this.editoras;
  }

  getNomeEditora(codEditora: number): string | undefined {
    const editora = this.editoras.find(editora => editora.codEditora === codEditora);
    if (editora) return editora.nome;
    else return undefined;
  }
}
