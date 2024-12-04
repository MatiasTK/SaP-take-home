import { Request, Response } from 'express';
import csvToJson from 'convert-csv-to-json';
import { userData } from '@/models/userData';

export const uploadCsv = async (req: Request, res: Response) => {
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

  try {
    const csvString = Buffer.from(req.file.buffer).toString('utf-8');
    const json = csvToJson.fieldDelimiter(',').csvStringToJson(csvString);

    userData.push(...json);

    res.status(200).send({
      message: 'El archivo se cargó correctamente',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error: No se pudo cargar el archivo',
    });
  }
};
