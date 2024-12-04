import { Router, Request, Response } from 'express';
import multer from 'multer';
import csvToJson from 'convert-csv-to-json';
import { userData } from '@/app';

const upload = multer();

const router: Router = Router();

router.post('/files', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(500).send({
      message: 'Error: No se ha subido ningún archivo',
    });
    return;
  }

  if (req.file.mimetype !== 'text/csv') {
    res.status(500).send({
      message: 'Error: El tipo de archivo debe ser CSV',
    });
    return;
  }

  const csvString = Buffer.from(req.file.buffer).toString('utf-8');
  const json = csvToJson.fieldDelimiter(',').csvStringToJson(csvString);

  userData.push(...json);

  res.status(200).send({
    message: 'El archivo se cargó correctamente',
  });
});

router.get('/users', (req: Request, res: Response) => {
  const { query } = req;
  const keys = Object.keys(query);

  if (keys.length == 0) {
    res.status(200).send({
      data: userData,
    });
  }

  keys.forEach((key) => {
    if (!userData[0].hasOwnProperty(key)) {
      res.status(500).send({
        message: `Error: La propiedad ${key} no existe en los datos`,
      });
    }
  });

  const filteredData = userData.filter((user) => {
    return keys.every((key) => {
      if (!query[key]) {
        return true;
      }

      return user[key].toLowerCase().includes(query[key].toString().toLowerCase());
    });
  });

  res.status(200).send({
    data: filteredData,
  });
});

export default router;
