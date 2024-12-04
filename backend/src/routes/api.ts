import { Router, Request, Response } from 'express';
import multer from 'multer';
import { uploadCsv } from '@/controllers/filesController';
import { searchUsers } from '@/controllers/userController';

const upload = multer();

const router: Router = Router();

router.post('/files', upload.single('file'), (req: Request, res: Response) => uploadCsv(req, res));

router.get('/users', (req: Request, res: Response) => searchUsers(req, res));

export default router;
