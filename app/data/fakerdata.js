import { faker } from "@faker-js/faker";

const generateTimeSeriesData = () => {
  const generateRandomDistribution = (previous) => {
    var weights = [1, 2, 1.2, 1, 3, 1, 1, 1];
    if (previous != -1) {
      weights[previous] += 100;
    }
    const randomArray = weights.map((value) => value * Math.random());
    const sum = randomArray.reduce((acc, value) => acc + value, 0);
    const normalizedArray = randomArray.map((value) => value / sum);
    return normalizedArray;
  };
  var activity = [];
  var previous = -1;
  for (var i = -500000; i < 0; i += 10) {
    let probabilities = generateRandomDistribution(previous);
    previous = probabilities.reduce(
      (maxIndex, currentValue, currentIndex, array) =>
        currentValue > array[maxIndex] ? currentIndex : maxIndex,
      0
    );
    activity.push({
      probabilities,
      time: new Date(Date.now() + i * 1000),
    });
  }

  return activity;
};

const generateFakeData = () => {
  const response = {
    userid: "fakedata",
    name: "fake",
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: "fakedata1234",

    clientId: faker.string.alphanumeric(),
    clientSecret: faker.string.alphanumeric(),
    accessToken: faker.string.alphanumeric(),

    typeOfUser: "fake",
    caregiver: [faker.person.firstName(), faker.person.firstName()],
    provider: [faker.person.firstName(), faker.person.firstName()],

    temperature: [
      { value: faker.number.int(), time: faker.date.past() },
      { value: faker.number.int(), time: faker.date.past() },
    ],
    activity: generateTimeSeriesData(),

    movement_baseline_low: faker.number.int(),
    movement_baseline_high: faker.number.int(),
    water_intake_oz_baseline: faker.number.int(),
    food_intake_baseline: faker.number.int(),
    heart_rate_baseline_low: faker.number.int(),
    heart_rate_baseline_high: faker.number.int(),
    temperature_baseline: faker.number.int(),

    messages: [
      { from: faker.person.firstName(), msg: faker.word.noun() },
      { from: faker.person.firstName(), msg: faker.word.noun() },
    ],
    events: [
      { time: faker.date.past(), event: faker.word.noun() },
      { time: faker.date.past(), event: faker.word.noun() },
    ],

    virtual_buttons: {
      checkup_button: faker.number.int(),
      fall_button: faker.number.int(),
      heart_rate_button: faker.number.int(),
      water_button: faker.number.int(),
      activity_button: faker.number.int(),
    },

    fall_notification: {
      status: faker.word.noun(),
      time: faker.date.past(),
    },
    food_notification: {
      status: faker.word.noun(),
      time: faker.date.past(),
    },
    water_notification: {
      status: faker.word.noun(),
      time: faker.date.past(),
    },
    movement_notification: {
      status: faker.word.noun(),
      time: faker.date.past(),
    },
    heart_notification: {
      status: faker.word.noun(),
      time: faker.date.past(),
    },
  };

  return response;
};

const fakeData = generateFakeData();

export default fakeData;
