function formatTwoDigits(number) {
  return number.toString().padStart(2, '0');
}

function getFormattedDateTime() {
  const now = new Date();

  const hours = formatTwoDigits(now.getHours());
  const minutes = formatTwoDigits(now.getMinutes());
  const seconds = formatTwoDigits(now.getSeconds());

  const day = formatTwoDigits(now.getDate());
  const month = formatTwoDigits(now.getMonth() + 1); // Janeiro = 0
  const year = now.getFullYear();

  const time = `${hours}:${minutes}:${seconds}`;
  const date = `${day}/${month}/${year}`;

  return { time, date };
}

setInterval(() => {
  const { time, date } = getFormattedDateTime();
  console.clear();
  console.log(`Hora: ${time}`);
  console.log(`Data: ${date}`);
}, 1000);
