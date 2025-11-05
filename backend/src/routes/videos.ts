import { Router } from 'express';
import { getVideoById, getVideos, getTopics, postRefresh } from '../controllers/videoController.js';

export const videosRouter = Router();

videosRouter.get('/videos', getVideos);
videosRouter.get('/videos/:id', getVideoById);
videosRouter.get('/topics', getTopics);
videosRouter.post('/refresh', postRefresh);
