interface StudentData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  isAlumni: boolean;
  city: string;
  area: string;
  programId: string;
  hubId: string;
  cohortId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentDataRegister {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  cohort: string;
}

export default StudentData;
