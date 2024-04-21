"use client";

import { useState, useEffect } from "react";

export default function NameLabel({ userid }) {
  const [name, setName] = useState("Loading...");

  const getName = async (id) => {
    //Makes call to API to fetch username.
    try {
      let res = await fetch(`/api/user_info/${id}`);
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

  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await getName(userid);
        setName(res?.response?.name);
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };
    fetchName();
  }, [userid]);

  return (
    <div className="flex flex-row mr-10">
      <div className="font-semibold text-lg ml-10">{`Welcome,`}&nbsp;</div>
      <span className="text-white font-normal">{name}</span>
    </div>
  );
}
