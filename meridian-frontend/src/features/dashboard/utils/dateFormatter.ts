const formatter = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...opts }).format(
    new Date(iso),
  );

export function formatPeriod(periodStart: string, periodEnd: string) {
  const start = formatter(periodStart, { month: "short", day: "numeric" });
  const end = formatter(periodEnd, { month: "short", day: "numeric" });
  const year = formatter(periodEnd, { year: "numeric" });
  return `${start}  -  ${end},   ${year}`;
}


export const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });