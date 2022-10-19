export default function getDurationFromms(totalDuration) {
  if (isNaN(totalDuration)) return null;
  const amountSeconds = Math.floor(totalDuration / 1000);
  const amountMinutes = Math.floor(amountSeconds / 60);
  const amountFullHours = Math.floor(amountMinutes / 60);

  const remainingMinutes = amountMinutes - 60 * amountFullHours;
  const remainingSeconds =
    amountSeconds - 60 * 60 * amountFullHours - 60 * remainingMinutes;

  if (amountFullHours > 0) {
    return `${amountFullHours}h ${remainingMinutes}m`;
  }

  //TODO: return correct string and check initial Stats again.
  if (amountMinutes) {
    return `${amountMinutes}m ${remainingSeconds}s`;
  }

  return `${remainingSeconds}s`;
}
