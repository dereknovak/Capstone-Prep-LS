import patientData from '../../data/patients';
import { PatientNoSSN } from '../types';

const patients: PatientNoSSN[] = patientData;

const getPublicPatientInfo = (): PatientNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

export default { getPublicPatientInfo };