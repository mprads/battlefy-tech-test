import { Router } from 'express';

const router = Router();

export default () => {
  router.get('/', (req, res) => {
    res.json({ message: 'Hit api' });
  });

  return router;
};