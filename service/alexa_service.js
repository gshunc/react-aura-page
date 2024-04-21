export const processAlexaData = async (data, date, timezone) => {
  const offset = Number(timezone);
  const selectedDate = new Date(date);
  if (
    selectedDate.getDate() != new Date(Date.now()).getDate() ||
    selectedDate.getMonth() != new Date(Date.now()).getMonth()
  ) {
    selectedDate.setHours(23 + offset, 59, 59, 999);
  }
  const midnight = new Date(date);
  midnight.setHours(offset, 0, 0);

  const timeSet = new Set();

  for (let i = 0; i < data?.length; i++) {
    const dateTime = new Date(data[i]?.time);
    const secondsOffset = 3 - (dateTime.getSeconds() % 3);
    const adjustedTime = new Date(dateTime.getTime() + secondsOffset * 1000);
    if (adjustedTime >= midnight) {
      timeSet.add(new Date(adjustedTime.setMilliseconds(0)).getTime());
    }
  }
  var res = [];
  let currentTime = new Date(midnight.setMilliseconds(0)).getTime();
  if (currentTime >= selectedDate.getTime()) {
    currentTime -= 86400000;
  }
  const interval = 3000;
  while (currentTime < selectedDate.getTime()) {
    if (timeSet.has(currentTime)) {
    }
    res.push({
      events: timeSet.has(currentTime) ? 1 : 0,
      time: new Date(currentTime),
    });
    currentTime += interval;
  }
  return res;
};
