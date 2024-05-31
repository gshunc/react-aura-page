const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProfileInfoById = async (id, date) => {
  const offset = new Date(date).getTimezoneOffset() / 60;
  try {
    let res = await fetch(`${baseURL}/api/analytics/${id}/${date}/${offset}`, {
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

export const getAlexaInfoById = async (id, date) => {
  const offset = new Date(date).getTimezoneOffset() / 60;
  try {
    let res = await fetch(`${baseURL}/api/alexaGraph/${id}/${date}/${offset}`, {
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

export const getAlexaInteractionsById = async (id, date, timezone) => {
  try {
    let res = await fetch(
      `${baseURL}/api/alexaInteractions/${id}/${date}/${timezone}`,
      {
        cache: "no-store",
      }
    );
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

export const getMonitoringDataById = async (id, date) => {
  const offset = new Date(date).getTimezoneOffset() / 60;
  const currentDate = new Date();
  const isToday = date.setMilliseconds(0) === currentDate.setMilliseconds(0);
  try {
    let res = await fetch(`${baseURL}/api/monitoring/${id}/${date}/${offset}`, {
      cache: isToday ? "no-store" : "default",
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
