export function getDateAddYear(yearDiff: number): Date {
  const now = new Date();
  now.setFullYear(now.getFullYear() + yearDiff);
  return now;
}

export function dateToString(date: Date, locale = 'en-US') {
  return [
    date.getFullYear(),
    (date.getMonth() + 1).toLocaleString(locale, { minimumIntegerDigits: 2 }),
    date.getDate().toLocaleString(locale, { minimumIntegerDigits: 2 }),
  ].join('-');
}
