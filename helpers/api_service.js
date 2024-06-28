const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getUser = async (id) => {
  //Makes call to API to fetch username.
  try {
    let res = await fetch(`${baseURL}/api/user_info/${id}`);
    if (!res.ok) {
      throw new Error("Error fetching user data.");
    }
    return res.json();
  } catch (error) {
    console.error("Error in getProfileInfoById:", error);
    throw new Error(
      "Error fetching information about user. Details: " + error.message
    );
  }
};

export const getAnalyticsInfoById = async (id, date) => {
  const res = await getUser(id);
  const offset = res.response.timezone_offset;

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
    console.error("Error in getAnalyticsInfoById:", error);
    throw new Error(
      "Error fetching information about user. Details: " + error.message
    );
  }
};

export const getAlexaInfoById = async (id, date) => {
  const res = await getUser(id);
  const offset = res.response.timezone_offset;

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
    console.error("Error in getAlexaInfoById:", error);
    throw new Error(
      "Error fetching information about user. Details: " + error.message
    );
  }
};

export const getAlexaInteractionsById = async (id, date, timezone) => {
  const res = await getUser(id);
  const offset = res.response.timezone_offset;

  try {
    let res = await fetch(
      `${baseURL}/api/alexaInteractions/${id}/${date}/${offset}`,
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
  const res = await getUser(id);
  const offset = res.response.timezone_offset;

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
