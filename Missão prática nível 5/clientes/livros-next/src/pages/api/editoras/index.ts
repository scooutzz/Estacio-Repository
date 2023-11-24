import { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '@/controle/ControleEditora';

const controleEditora = new ControleEditora();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const editoras = controleEditora.getEditoras();
      res.status(200).json(editoras);
    } else {
      res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Exceção ocorrida no servidor' });
  }
}
