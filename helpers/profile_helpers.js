import { formatDate } from "../utils/formatDate";

export const countSteps = (activity_history) => {
  var step_array = [];
  var times = [];
  var step_count = 0;
  for (let i = 0; i < activity_history?.length; i++) {
    var probabilities = activity_history[i]["probabilities"];
    var numbers = probabilities.map((value) => +value);
    var max = Math.max(...numbers);
    if (Number(activity_history[i]["probabilities"][1]) === max) {
      step_count += 8;
      step_array.push(step_count);
    } else if (Number(activity_history[i]["probabilities"][2] === max)) {
      step_count += 12;
      step_array.push(step_count);
    } else {
      step_array.push(step_count);
    }
    times.push(formatDate(activity_history[i]["time"]));
  }
  return { step_array, times, step_count };
};

export const processUserData = async (info, date, timezone) => {
  const offset = Number(timezone);
  const selectedDate = new Date(date);
  if (
    selectedDate.getDate() != new Date(Date.now()).getDate() ||
    selectedDate.getMonth() != new Date(Date.now()).getMonth()
  ) {
    selectedDate.setHours(23 + offset, 59, 59, 999);
  }
  const time_series = info;
  const midnight = new Date(date);
  midnight.setHours(timezone, 0, 0);
  //Using hashmap to keep track of time slots with activity data to be referencenced when filling in missing data below. Times are standardized to three second intervals and times not on three second intervals are shoved onto the next three second interval timeslot.
  const timeMap = new Map();

  for (let i = 0; i < time_series?.length; i++) {
    const dateTime = new Date(time_series[i]?.time);
    const secondsOffset = 3 - (dateTime.getSeconds() % 3);
    const adjustedTime = new Date(dateTime.getTime() + secondsOffset * 1000);
    if (adjustedTime >= midnight) {
      timeMap.set(
        new Date(adjustedTime.setMilliseconds(0)).getTime(),
        time_series[i].probabilities
      );
    }
  }
  //Filling in empty times, checking if a timestamp was found in the database and updating probabilities accordingly, else we assume the sensor detected empty.
  var res = [];
  const interval = 3000;
  let currentTime = new Date(midnight.setMilliseconds(0));
  if (currentTime.getTime() >= selectedDate.getTime()) {
    currentTime.setTime(currentTime.getTime() - 86400000);
  }
  while (currentTime.getTime() < selectedDate.getTime()) {
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
