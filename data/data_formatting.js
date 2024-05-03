import { formatDate } from "../utils/formatDate";

export function formatDataForActivityProfile(info) {
  //Formats data for display in the activity doughnut chart. Categorizes all data into counts of each activity type in an array in a simple for loop. O(N) with N = length of activity_history.
  var activity_history = info.response;
  if (
    !activity_history ||
    activity_history.length === 0 ||
    !activity_history[0].probabilities
  ) {
    throw new Error("Data is not available or incomplete");
  }

  var empty_count = 0;
  var walking_count = 0;
  var running_count = 0;
  var jumping_count = 0;
  var sitting_standing_count = 0;
  var arm_count = 0;
  var falling_count = 0;
  for (let i = 0; i < activity_history?.length; i++) {
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
  }
  //Checking if counts are all zero and then displaying that no activity has been detected to the user.
  var isEmpty = false;
  if (empty_count == activity_history?.length) {
    isEmpty = true;
  }

  const active =
    walking_count + running_count + jumping_count + arm_count + falling_count;
  const active_time = active * 3;

  const labels = [
    "Walking",
    "Running",
    "Jumping",
    "Sitting/Standing",
    "Arm Exercises",
    "Falling",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Times Detected",
        data: [
          walking_count,
          running_count,
          jumping_count,
          sitting_standing_count,
          arm_count,
          falling_count,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
    isEmpty: isEmpty,
    active_time: active_time,
  };

  return data;
}

export function formatDataForStepBar(info, step_data) {
  //Formats data for the step bar chart by binning step amounts into 15 minute sections.
  var activity_history = info.response;
  if (
    !activity_history ||
    activity_history.length === 0 ||
    !activity_history[0]?.probabilities
  ) {
    throw new Error("Data is not available or incomplete");
  }

  const step_array = step_data?.step_array;

  var intervals = [];
  var colors = [];
  var borders = [];
  var newTimes = [];
  for (let i = 0; i < activity_history?.length - 300; i += 300) {
    let increase = step_array[i + 300] - step_array[i];
    intervals.push(increase);
    newTimes.push(formatDate(activity_history[i]["time"]));
    if (increase >= 300) {
      colors.push("rgba(75, 192, 192, 0.6)");
      borders.push("rgba(75, 192, 192, 1)");
    } else if (increase >= 150) {
      colors.push("rgba(255, 240, 0, 0.6)");
      borders.push("rgba(255, 240, 0, 1)");
    } else {
      colors.push("rgba(255, 79, 120,0.6)");
      borders.push("rgba(255, 79, 120,1)");
    }
  }
  const labels = newTimes;
  const data = {
    labels,
    datasets: [
      {
        label: "Step Count",
        data: intervals,
        borderColor: borders,
        backgroundColor: colors,
      },
    ],
  };
  return data;
}

export function formatDataForStepChart(step_data) {
  //Looping through all activity_history points and adding steps for running and walking.
  const step_array = step_data?.step_array;
  const times = step_data?.times;

  const labels = times;
  const data = {
    labels,
    datasets: [
      {
        label: "Step Count",
        data: step_array,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return data;
}

export function formatDataForActivityBar(info) {
  //Takes raw activity data and finds counts of different activities over 15 minute intervals for chart data. Complexity O(N), where N is length of activity history (up to 28800 data points).
  var activity_history = info.response;
  if (
    !activity_history ||
    activity_history.length === 0 ||
    !activity_history[0]?.probabilities
  ) {
    throw new Error("Data is not available or incomplete");
  }

  //Creating arrays to track 15 minute intervals, assign colors and times to each interval.
  var intervals = [];
  var colors = [];
  var borders = [];
  var times = [];
  //Iterate through all data points to categorize.
  for (let i = 0; i < activity_history?.length - 300; i += 300) {
    var empty_count = 0;
    var walking_count = 0;
    var running_count = 0;
    var jumping_count = 0;
    var sitting_standing_count = 0;
    var arm_count = 0;
    var falling_count = 0;
    //Looping through in chunks of 300 data points = 15 minutes of real time. 300 3 second intervals = 900 1 second intervals = 15 minutes. Each index in probabilities is equal to one type of activity.
    for (let j = i; j < i + 300; j++) {
      var probabilities = activity_history[j]["probabilities"];
      var numbers = probabilities.map((value) => +value);
      var max = Math.max(...numbers);
      if (Number(activity_history[j]["probabilities"][0]) === max) {
        empty_count += 1;
      } else if (Number(activity_history[j]["probabilities"][1]) === max) {
        walking_count += 1;
      } else if (Number(activity_history[j]["probabilities"][2] === max)) {
        running_count += 1;
      } else if (Number(activity_history[j]["probabilities"][3] === max)) {
        jumping_count += 1;
      } else if (Number(activity_history[j]["probabilities"][4] === max)) {
        sitting_standing_count += 1;
      } else if (Number(activity_history[j]["probabilities"][6] === max)) {
        arm_count += 1;
      } else if (Number(activity_history[j]["probabilities"][7] === max)) {
        falling_count += 1;
      }
    }

    //Finding proportion of active to inactive for Y variable in each bar.
    let active =
      walking_count + running_count + jumping_count + arm_count + falling_count;
    let inactive = empty_count + sitting_standing_count;
    let proportion = active / (active + inactive);

    //Categorizing color by proportion. Semi arbitrary, could be improved by user testing.
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
}

export function formatDataForAlexaGraph(info) {
  //Takes raw activity data and finds counts of different activities over 15 minute intervals for chart data. Complexity O(N), where N is length of activity history (up to 28800 data points).
  var alexa_history = info.response;
  //Creating arrays to track 15 minute intervals, assign colors and times to each interval.
  var intervals = [];
  var times = [];
  //Iterate through all data points to categorize.
  for (let i = 0; i < alexa_history?.length - 300; i += 300) {
    var count = 0;
    //Looping through in chunks of 300 data points = 15 minutes of real time. 300 3 second intervals = 900 1 second intervals = 15 minutes. Each index in probabilities is equal to one type of activity.
    for (let j = i; j < i + 300; j++) {
      count += alexa_history[j]["events"];
    }
    intervals.push(count);
    times.push(formatDate(alexa_history[i]["time"]));
  }
  const labels = times;
  const data = {
    labels,
    datasets: [
      {
        label: "Alexa Interaction Counts",
        data: intervals,
      },
    ],
  };

  return data;
}
