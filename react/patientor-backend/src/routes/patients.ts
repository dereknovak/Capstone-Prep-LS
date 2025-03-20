import express from 'express';
import { Response } from 'express';
import { PatientNoSSN } from '../types';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNoSSN[]>) => {
  res.send(patientService.getPublicPatientInfo());
});

export default router;