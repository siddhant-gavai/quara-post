function daysUntilChristmas() {
  let today = new Date(); // Get the current date
  let currentYear = today.getFullYear(); // Get the current year

  // Create a date object for Christmas of the current year
  let christmas = new Date(currentYear, 11, 25); // Month is 0-based (11 = December)

  // If Christmas has already passed this year, calculate for the next year's Christmas
  if (today > christmas) {
    christmas = new Date(currentYear + 1, 11, 25);
  }

  // Calculate the difference in milliseconds
  let difference = christmas - today;

  // Convert milliseconds to days
  let daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return daysLeft;
}

console.log(`Days until Christmas: ${daysUntilChristmas()}`);
