import Editora from "../modelo/Editora";

const editoras: Array<Editora> = [
  new Editora(1, 'Editora A'),
  new Editora(2, 'Editora B'),
  new Editora(3, 'Editora C')
];

class ControleEditora {
  private editoras: Array<Editora>;

  constructor() {
    this.editoras = editoras;
  }

  getEditoras(): Array<Editora> {
    return this.editoras;
  }

  getNomeEditora(codEditora: number): string | undefined {
    const editora = this.editoras.find(editora => editora.codEditora === codEditora);
    return editora ? editora.nome : undefined;
  }
}

export default ControleEditora;
