import { formatDate } from "../utils/formatDate";

export const countSteps = (activity_history) => {
  var data = activity_history.response;
  var step_array = [];
  var times = [];
  var step_count = 0;
  for (let i = 0; i < data?.length; i++) {
    var probabilities = data[i]["probabilities"];
    var numbers = probabilities.map((value) => +value);
    var max = Math.max(...numbers);
    if (Number(data[i]["probabilities"][1]) === max) {
      step_count += 8;
      step_array.push(step_count);
    } else if (Number(data[i]["probabilities"][2] === max)) {
      step_count += 12;
      step_array.push(step_count);
    } else {
      step_array.push(step_count);
    }
    times.push(formatDate(data[i]["time"]));
  }
  return { step_array, times, step_count };
};

export const processUserData = async (time_series, date, timezone) => {
  //Local time in UTC time
  const selectedDate = new Date(date);
  selectedDate.setTime(selectedDate.getTime() - 3600000 * timezone);

  //Local midnight as a UTC Time. -> Go back to local.
  var startOfDay = new Date(new Date(date).getTime() - 3600000 * timezone);
  startOfDay.setUTCHours(timezone, 0, 0, 0);
  startOfDay.setTime(startOfDay.getTime() - 3600000 * timezone);

  // Midnight after selectedDate or selectedDate, whichever is earlier.
  const endOfDay = new Date(new Date(date).setDate(startOfDay.getDate() + 1));
  endOfDay.setUTCHours(timezone, 0, 0);
  if (endOfDay.getTime() > new Date()) {
    endOfDay.setTime(new Date().getTime());
  }
  endOfDay.setTime(endOfDay.getTime() - 3600000 * timezone);

  // Creating a hashmap to store key values of times and their probability vectors. Allows us to then fill in blank times and pull data for the rest.
  const timeMap = new Map();

  for (let i = 0; i < time_series?.length; i++) {
    // For every entry in the time series, we find the UTC date and reduce by the timezone offset to match local times.
    const dateTime = new Date(
      new Date(time_series[i]?.time).getTime() - 3600000 * timezone
    );
    // Every 3 seconds we find the neares datapoint and insert it
    const secondsOffset = 3 - (dateTime.getSeconds() % 3);
    const adjustedTime = new Date(dateTime.getTime() + secondsOffset * 1000);
    if (adjustedTime >= endOfDay) {
      timeMap.set(
        new Date(adjustedTime.setMilliseconds(0)).getTime(),
        time_series[i].probabilities
      );
    }
  }

  //Filling in empty times, checking if a timestamp was found in the database and updating probabilities accordingly, else we assume the sensor detected empty.
  var res = [];
  const interval = 3000;
  //Here, start of day is already adjusted to local time.
  let currentTime = new Date(startOfDay.setMilliseconds(0));
  while (currentTime.getTime() < endOfDay.getTime()) {
    res.push({
      probabilities: timeMap.get(currentTime.getTime()) || [
        1, 0, 0, 0, 0, 0, 0, 0,
      ],
      time: new Date(currentTime.getTime()),
    });
    currentTime.setMilliseconds(currentTime.getMilliseconds() + interval);
  }
  return res;
};
