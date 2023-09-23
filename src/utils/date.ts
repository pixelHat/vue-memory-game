export function formatTimeDifference(timeDifference: number): string {
  // Convert milliseconds to minutes and seconds
  const minutes = Math.floor(timeDifference / 60000);
  const seconds = Math.floor((timeDifference % 60000) / 1000);

  // Format the result as "minutes:seconds"
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return formattedTime;
}
