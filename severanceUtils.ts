// 1 work year consists of 52 work weeks, source: https://www.talenta.co/blog/insight-talenta/jumlah-hari-kerja-dalam-sebulan/
export const WORK_WEEKS_IN_A_YEAR = 52;
export const WORK_MILIS_IN_A_YEAR = 1000 * 60 * 60 * 24 * 7 * WORK_WEEKS_IN_A_YEAR;

export const LABOUR_LAWS: Array<LabourLaw> = [
  {
    name: 'UU No 13 Tahun 2003',
    passedDate: new Date('2003'),
    effectiveDate: new Date('2003'),
    specialMultiplier: 2,
  },
  {
    // Source: https://nasional.kontan.co.id/news/menko-airlangga-sebut-aturan-pelaksana-uu-cipta-kerja-era-baru-berusaha
    name: 'UU No 11 Tahun 2020',
    passedDate: new Date('2020-11-02'),
    effectiveDate: new Date('2021-02-02'),
    specialMultiplier: 1,
  },
];

export type LabourLaw = {
  name: string;
  passedDate: Date;
  effectiveDate: Date;
  specialMultiplier: number;
}

export type SeveranceFormData = {
  startWorkDate: Date;
  stopWorkDate: Date;
  salary?: number;
  specialReason?: boolean;
}

export type SeveranceData = {
  baseMultiplier: number;
  rewardMultiplier: number;
  effectiveLaw: LabourLaw;
}

export function getWorkingDurationMilis(data: SeveranceFormData) {
  return data.stopWorkDate.getTime() - data.startWorkDate.getTime();
}

export function calculateSeveranceData(data: SeveranceFormData): SeveranceData {
  const workDurationMs = getWorkingDurationMilis(data);
  const workDurationYear = workDurationMs / WORK_MILIS_IN_A_YEAR;
  const baseMultiplier = workDurationYear >= 8 ? 9 : Math.floor(workDurationYear) + 1;
  const rewardMultiplier = workDurationYear < 3 ? 0 : (workDurationYear >= 24 ? 10 : Math.floor(workDurationYear / 3) + 1);
  let effectiveLaw: LabourLaw;
  for (const law of LABOUR_LAWS) {
    if (law.effectiveDate <= data.stopWorkDate) {
      effectiveLaw = law;
    }
  }
  return { baseMultiplier, rewardMultiplier, effectiveLaw };
}
