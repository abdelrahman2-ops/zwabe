// Utility for Excel value mapping and transformation
export const favMonthMap = {
  "January": "يناير",
  "February": "فبراير",
  "March": "مارس",
  "April": "أبريل",
  "May": "مايو",
  "June": "يونيو",
  "July": "يوليو",
  "August": "أغسطس",
  "September": "سبتمبر",
  "October": "أكتوبر",
  "November": "نوفمبر",
  "December": "ديسمبر"
};

export function transformCountryRow(row) {
  if (row.favMonth && typeof row.favMonth === 'string') {
    row.favMonth = row.favMonth.split(',').map(v => favMonthMap[v.trim()] || v.trim());
  }
  return row;
}
