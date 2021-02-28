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

// https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
// For webkit :/
export function isValidDate(date: Date) {
  return !isNaN(date.getTime());
}

export function stringToDate(date = '', locale = 'en-US') {
  const dateArr = date.split('-');
  if (dateArr.length === 3) {
    try {
      const d = new Date([dateArr[0],
        parseInt(dateArr[1], 10).toLocaleString(locale, { minimumIntegerDigits: 2 }),
        parseInt(dateArr[2], 10).toLocaleString(locale, { minimumIntegerDigits: 2 })
      ].join('-'));
      return d;
    } catch {}
  }
  return new Date(date);
}
