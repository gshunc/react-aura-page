export const processMonitoringData = async (data, date, offset) => {
  const num_offset = Number(offset);
  var selectedDate = new Date(date);
  if (selectedDate.getHours() - offset < 0) {
    selectedDate = new Date(selectedDate.getTime() - 86400000);
  }
  if (
    (selectedDate.getDate() != new Date(Date.now()).getDate()) |
    (selectedDate.getMonth() != new Date(Date.now()).getMonth())
  ) {
    selectedDate.setDate(selectedDate.getDate() + 1);
    selectedDate.setHours(num_offset, 0, 0, 0);
  }
  var midnight = new Date(date);
  if (midnight.getHours() - offset < 0) {
    midnight = new Date(midnight.getTime() - 86400000);
  }
  midnight.setHours(num_offset, 0, 0);

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
  while (currentTime < selectedDate.getTime()) {
    res.push({
      time: currentTime,
      count: 0,
    });
    currentTime = currentTime + 900000;
  }
  return res;
};
