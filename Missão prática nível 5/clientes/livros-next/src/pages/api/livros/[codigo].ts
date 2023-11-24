import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivros from '@/controle/ControleLivros';

const controleLivro = new ControleLivros();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'DELETE') {
      const { codigo } = req.query;
      if (typeof codigo !== 'string') {
        res.status(400).json({ error: 'codigo inválido' });
        return;
      }

      controleLivro.excluir(Number(codigo));
      res.status(200).json({ message: 'Livro excluído com sucesso' });
    } else {
      res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Exceção ocorrida no servidor' });
  }
}
