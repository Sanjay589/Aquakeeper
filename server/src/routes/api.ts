import { Router } from 'express';
import healthRouter from './health';
import authRouter from './auth';
import aquariumsRouter from './aquariums';
import fishRouter from './fish';
import waterReadingsRouter from './waterReadings';
import remindersRouter from './reminders';
import chatRouter from './chat';
import fishAnalysisRouter from './fishAnalysis';
import storeRouter from './store';

const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/aquariums', aquariumsRouter);
router.use('/fish', fishRouter);
router.use('/water-readings', waterReadingsRouter);
router.use('/reminders', remindersRouter);
router.use('/chat', chatRouter);
router.use('/fish-analysis', fishAnalysisRouter);
router.use('/store', storeRouter);

export default router;
