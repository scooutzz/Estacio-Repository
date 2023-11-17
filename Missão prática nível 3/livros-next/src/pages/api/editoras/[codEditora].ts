import { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '@/controle/ControleEditora';

const controleEditora = new ControleEditora();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { codEditora } = req.query;
      if (typeof codEditora !== 'string') {
        res.status(400).json({ error: 'codEditora inválido' });
        return;
      }

      const editoraNome = controleEditora.getNomeEditora(Number(codEditora));
      res.status(200).json({ nomeEditora: editoraNome });
    } else {
      res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Exceção ocorrida no servidor' });
  }
}
