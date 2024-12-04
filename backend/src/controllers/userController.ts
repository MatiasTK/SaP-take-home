import { Request, Response } from 'express';
import { userData } from '@/models/userData';

export const searchUsers = (req: Request, res: Response) => {
  const { q } = req.query;

  if (!q) {
    res.status(500).send({
      message: 'Error: No se ha enviado ningún parámetro de búsqueda',
    });

    return;
  }

  const filteredData = userData.filter((user) => {
    return Object.keys(user).some((key) => {
      return user[key].toString().toLowerCase().includes(q.toString().toLowerCase());
    });
  });

  res.status(200).send({
    data: filteredData,
  });
};
