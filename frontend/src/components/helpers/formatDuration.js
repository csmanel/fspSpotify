export const formatDuration = (duration) => {
  const mins = Math.floor(duration / 60);
  const secs = duration % 60;
  const formatMins = mins < 10 ? String(mins) : String(mins).padStart(2, '0');
  const formatSecs = String(secs).padStart(2, '0');
  return `${formatMins}:${formatSecs}`;
};
