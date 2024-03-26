"use client";

import { useState, useEffect } from "react";

export default function NameLabel({ userid }) {
  const [name, setName] = useState("Loading...");

  const getName = async (id) => {
    //Makes call to API to fetch username.
    try {
      let res = await fetch(`/api/user_info/${id}`, {
        cache: "no-store",
      });
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
  }, []);

  return (
    <div className="font-semibold text-2xl ml-10">{`Welcome ${name}!`}</div>
  );
}
