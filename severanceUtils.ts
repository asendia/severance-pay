// 1 work year consists of 52 work weeks, source: https://www.talenta.co/blog/insight-talenta/jumlah-hari-kerja-dalam-sebulan/
export const WORK_WEEKS_IN_A_YEAR = 52;
export const WORK_MILIS_IN_A_YEAR = 1000 * 60 * 60 * 24 * 7 * WORK_WEEKS_IN_A_YEAR;

export type SeveranceFormData = {
  startWorkDate: Date;
  stopWorkDate: Date;
  salary?: number;
}

export type SeveranceMultiplier = {
  baseMultiplier: number;
  rewardMultiplier: number;
}

export function getWorkingDurationMilis(data: SeveranceFormData) {
  return data.stopWorkDate.getTime() - data.startWorkDate.getTime();
}

export function calculateSeveranceMultiplier(data: SeveranceFormData): SeveranceMultiplier {
  const workDurationMs = getWorkingDurationMilis(data);
  const workDurationYear = workDurationMs / WORK_MILIS_IN_A_YEAR;
  const baseMultiplier = workDurationYear >= 8 ? 9 : Math.floor(workDurationYear) + 1;
  const rewardMultiplier = workDurationYear < 3 ? 0 : (workDurationYear >= 24 ? 10 : Math.floor(workDurationYear / 3) + 1);
  return { baseMultiplier, rewardMultiplier };
}
