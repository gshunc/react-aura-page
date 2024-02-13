const getProfileInfoById = async (id) => {
  try {
    let res = await fetch(`http://localhost:3000/api/analytics/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Error fetching information from user.");
    }
    return res.json();
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
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    hour12: false,
  });
  return formattedDate;
};

export const pullData = async (id, date) => {
  // Pulls down time series data from MongoDB. Schema already has projection to minimize useless information. Could consider cleaning up query to reduce number of datapoints coming across the wire, adding time based query.
  const selectedDate = new Date(date);
  const info = await getProfileInfoById(id);
  const time_series = info?.response?.activity;
  const midnight = new Date(date);
  midnight.setHours(0, 0, 0);
  //Using hashmap to keep track of time slots with activity data to be referencenced when filling in missing data below. Times are standardized to three second intervals and times not on three second intervals are shoved onto the next three second interval timeslot.
  var timeMap = new Map();
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
    //Time adjustment here may lead to lost steps if we, for example, have walking detected at (three second interval) + 1, and (three second interval) + 2.
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
