export function toStringYYYYMMDD_HHMMSS(
  date: number,
  locale: string = "ja-JP",
): string {
  const d = new Date(date * 1000);
  return `${d.toLocaleDateString(locale)} ${d.toLocaleTimeString(locale)}`;
}

export function toStringYYYYMMDD_HHMMSS_ja(date: number): string {
  const d = new Date(date);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}時${d.getMinutes()}分`;
}
