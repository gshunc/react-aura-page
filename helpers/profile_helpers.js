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

// Better way of binning data for Activity Bars. Need to implement into graph and check.
export const binUserData = (data, date, timezone) => {
  const offset = Number(timezone);
  const selectedDate = new Date(date);
  if (
    (selectedDate.getDate() != new Date(Date.now()).getDate()) |
    (selectedDate.getMonth() != new Date(Date.now()).getMonth())
  ) {
    selectedDate.setHours(23 + offset, 59, 59, 999);
  }
  const midnight = new Date(date);
  midnight.setHours(offset, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(offset + 24, 0, 0);

  var timeList = [];

  //Creating list of all times from dataset
  for (let i = 0; i < data?.length; i++) {
    const dateTime = new Date(data[i]?.time);
    if (dateTime >= midnight) {
      timeList.push(dateTime.getTime());
    }
  }
  //Want to take a rolling count of the times from the list
  var res = [];
  //start at midnight
  let currentTime = new Date(midnight.setMilliseconds(0)).getTime();
  if (currentTime >= selectedDate.getTime()) {
    currentTime -= 86400000;
  }
  for (let i = 0; i < timeList.length; i++) {
    var currentEnd = currentTime + 900000;
    var empty_count = 0;
    var walking_count = 0;
    var running_count = 0;
    var jumping_count = 0;
    var sitting_standing_count = 0;
    var arm_count = 0;
    var falling_count = 0;
    while (timeList[i] < currentEnd) {
      var probabilities = activity_history[i]["probabilities"];
      var numbers = probabilities.map((value) => +value);
      var max = Math.max(...numbers);
      if (Number(activity_history[i]["probabilities"][0]) === max) {
        empty_count += 1;
      } else if (Number(activity_history[i]["probabilities"][1]) === max) {
        walking_count += 1;
      } else if (Number(activity_history[i]["probabilities"][2] === max)) {
        running_count += 1;
      } else if (Number(activity_history[i]["probabilities"][3] === max)) {
        jumping_count += 1;
      } else if (Number(activity_history[i]["probabilities"][4] === max)) {
        sitting_standing_count += 1;
      } else if (Number(activity_history[i]["probabilities"][6] === max)) {
        arm_count += 1;
      } else if (Number(activity_history[i]["probabilities"][7] === max)) {
        falling_count += 1;
      }
      i += 1;
    }
    let active =
      walking_count + running_count + jumping_count + arm_count + falling_count;
    let inactive = empty_count + sitting_standing_count;
    let proportion = active / (active + inactive);

    if (proportion >= 0.66) {
      colors.push("rgba(75, 192, 192, 0.6)");
      borders.push("rgba(75, 192, 192, 1)");
    } else if (proportion >= 0.33) {
      colors.push("rgba(255, 240, 0, 0.6)");
      borders.push("rgba(255, 240, 0, 1)");
    } else {
      colors.push("rgba(255, 79, 120,0.6)");
      borders.push("rgba(255, 79, 120,1)");
    }

    intervals.push(proportion * 15);
    times.push(formatDate(activity_history[i]["time"]));
    currentTime = currentEnd;
  }
  while (currentTime < endOfDay) {
    intervals.push(0);
    times.push(formatDate(currentTime));
    currentTime = currentTime + 900000;
  }

  const labels = times;
  const data = {
    labels,
    datasets: [
      {
        label: "Active Time",
        data: intervals,
        borderColor: borders,
        backgroundColor: colors,
      },
    ],
  };

  return data;
};
