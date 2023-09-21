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
  attendanceId: string;
  program: ProgramData;
  isEmailSent: boolean;
  hub: HubData;
  cohort: CohortData;
  createdAt: string;
  updatedAt: string;
}

export interface SettingData {
  id: string;
  createdAt: string;
  updatedAt: string;
  sourceEmail: string;
  password: string;
  content: string;
  subject: string;
  timeLimit: number;
}

export interface StudentDataRegister {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  cohort: string;
}

export interface HubData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  students?: StudentData[];
}

export interface ProgramData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  cohorts?: CohortData[];
}

export interface CohortData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  program?: ProgramData;
}

export interface StudentStatsData {
  totalStudents: number;
  totalGuests: number;
  totalLearners: number;
  studentsPerProgram: { program: string; count: number }[];
  perProgramPercent: { program: string; percent: number }[];
}

export interface ActiveStatsData {
  studentsPerProgram: { program: string; count: number }[];
  perProgramPercent: { program: string; percent: number }[];
}

export interface AttendanceStatsData {
  lastWeek: {
    sun: number;
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
    sat: number;
  };
  currentWeek: {
    sun: number;
    mon: number;
    tue: number;
    wed: number;
    thu: number;
  };
  attendanceDiff: {
    sun: number;
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number | null;
    sat: number | null;
  };
  currentWeekSum: number;
  lastWeekSum: number;
  totalDiff: number;
  percentageRate: string;
}

export default StudentData;
