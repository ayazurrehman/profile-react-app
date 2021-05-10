export const dateInFuture = function (firstDate, secondDate) {
  if (firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)) {
    return true;
  }

  return false;
};

export const isBirthdayCheck = function (date) {
  const today = new Date();
  return (
    today.getUTCMonth() === date.getUTCMonth() &&
    today.getUTCDate() === date.getUTCDate()
  );
};

// sources
// https://flaviocopes.com/how-to-check-dates-same-day-javascript/
// https://dev.to/dailydevtips1/vanilla-javascript-check-if-date-is-in-the-past-1508#:~:text=JavaScript%20Check%20if%20a%20Date%20is%20in%20the%20Past&text=setHours(0%2C%200%2C%200%2C%200))%20%7B%20return,)%3B%20dateInFuture(future%2C%20today)%3B
