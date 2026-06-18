import { Router } from 'express';

const router = Router();

router.use((req, res) => {
  res.status(501).json({
    success: false,
    message: 'Endpoint /api/aquariums is not implemented in Step 1 foundation setup.'
  });
});

export default router;
