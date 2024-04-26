export const getProfileInfoById = async (id, date, offset) => {
  try {
    let res = await fetch(`/api/analytics/${id}/${date}/${offset}`, {
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

export const getAlexaInfoById = async (id, date, offset) => {
  try {
    let res = await fetch(`/api/alexaGraph/${id}/${date}/${offset}`, {
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

export const getAlexaInteractionsById = async (id, date, offset) => {
  try {
    let res = await fetch(`/api/alexaInteractions/${id}/${date}/${offset}`, {
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

export const getMonitoringDataById = async (id, date, offset) => {
  try {
    let res = await fetch(`/api/monitoring/${id}/${date}/${offset}`, {
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
