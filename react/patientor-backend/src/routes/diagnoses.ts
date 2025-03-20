import express from 'express';
import { Response } from "express";
import { Diagnosis } from "../types";
import diagnosesData from '../../data/diagnoses';

const router = express.Router();
const diagnoses: Diagnosis[] = diagnosesData;

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  console.log('HELLO!');
  res.send(diagnoses);
});

export default router;