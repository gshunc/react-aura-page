const getProfileInfoById = async (id, date) => {
  //Simple API call.
  try {
    let res = await fetch(`/api/analytics/${id}/${date}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Error fetching information from user.");
    }
    const result = res.json();
    return result;
  } catch (error) {
    console.error("Error in getProfileInfoById:", error);
    throw new Error(
      "Error fetching information about user. Details: " + error.message
    );
  }
};

export const formatDate = (raw_date) => {
  //Helper function used in multiple graphing components.
  const str_date = String(raw_date);
  const formattedDate = new Date(str_date).toLocaleString("en-US", {
    timezone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    day: "2-digit",
  });
  return formattedDate;
};

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
  return { step_array, times };
};

export const processData = async (info, date) => {
  const selectedDate = new Date(date);
  if (
    selectedDate.getDate() != new Date(Date.now()).getDate() ||
    selectedDate.getMonth() != new Date(Date.now()).getMonth()
  ) {
    selectedDate.setHours(23, 59, 59, 999);
  }
  const time_series = info?.activity;
  const midnight = new Date(date);
  midnight.setHours(0, 0, 0);
  console.log(date);
  console.log(midnight);
  console.log(selectedDate);
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
    //Time adjustment here may lead to lost steps if we, for example, have walking detected at (three second interval) + 1, and (three second interval) + 2. This is hard to fix because of the nature of the data being probabilities and not step counts, thus we can't sum anything.
  }
  //Filling in empty times, checking if a timestamp was found in the database and updating probabilities accordingly, else we assume the sensor detected empty.
  var res = [];
  const interval = 3000;
  let currentTime = new Date(midnight.setMilliseconds(0));
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

export const pullData = async (id, date) => {
  // Pulls down time series data from MongoDB. Schema already has projection to minimize useless information. Could consider cleaning up query to reduce number of datapoints coming across the wire, adding time based query
  const res = await getProfileInfoById(id, date);
  return res.response;
};
