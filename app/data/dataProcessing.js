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

const pullData = async (id, date) => {
  const selectedDate = new Date(date);
  const info = await getProfileInfoById(id);
  const time_series = info?.response?.activity;
  var first_index = -1;
  const midnight = new Date(date);
  midnight.setHours(0, 0, 0);
  for (let i = 0; i < time_series?.length; i++) {
    if (new Date(time_series[i]?.time) >= midnight) {
      first_index = i;
      break;
    }
  }

  var res = [];
  if (first_index === -1) {
    const interval = 3000;
    let currentTime = new Date(midnight.getTime());
    while (currentTime.getTime() < selectedDate.getTime()) {
      res.push({
        probabilities: [1, 0, 0, 0, 0, 0, 0, 0],
        time: new Date(currentTime.getTime()),
      });
      currentTime.setMilliseconds(currentTime.getMilliseconds() + interval);
    }
  }
  return res;
};

export default pullData;
