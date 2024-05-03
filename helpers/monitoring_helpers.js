export const processMonitoringData = async (data, date, offset) => {
  const num_offset = Number(offset);
  const selectedDate = new Date(date);
  if (
    (selectedDate.getDate() != new Date(Date.now()).getDate()) |
    (selectedDate.getMonth() != new Date(Date.now()).getMonth())
  ) {
    selectedDate.setHours(23 + offset, 59, 59, 999);
  }
  const midnight = new Date(date);
  midnight.setHours(num_offset, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(24 + num_offset, 0, 0);

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
    var count = 0;
    var currentEnd = currentTime + 900000;
    while (timeList[i] < currentEnd) {
      count += 1;
      i += 1;
    }
    res.push({
      time: currentTime,
      count: count,
    });
    currentTime = currentEnd;
  }
  while (currentTime < endOfDay) {
    res.push({
      time: currentTime,
      count: 0,
    });
    currentTime = currentTime + 900000;
  }
  return res;
};
