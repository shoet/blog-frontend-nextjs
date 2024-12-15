export function toStringYYYYMMDD_HHMMSS(
  date: number,
  locale: string = "ja-JP",
): string {
  const d = new Date(date * 1000);
  return `${d.toLocaleDateString(locale)} ${d.toLocaleTimeString(locale)}`;
}
