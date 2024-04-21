import React, { useState, useEffect } from "react";
import LoadingComponent from "@/app/components/misc/LoadingComponent";
import ActivityProfile from "./charts/ActivityProfile";
import StatProfile from "./charts/StatProfile";
import { formatDataForActivityProfile } from "../../../../data/data_formatting";

function ActivityProfileContainer(props) {
  const { unformattedData, steps } = props;
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      if (unformattedData.length != 0) {
        const formattedData = formatDataForActivityProfile(unformattedData);
        setData(formattedData);
      }
    };
    fetchData();
  }, [unformattedData]);

  if (!data) {
    return (
      <div className="text-bold font-large">
        <LoadingComponent />
      </div>
    );
  }

  return data && !data.isEmpty ? (
    <div className="h-container flex flex-row justify-around">
      <ActivityProfile data={data} />
      <StatProfile active_time={data.active_time} step_data={steps} />
    </div>
  ) : (
    <div className="min-h-full flex flex-row justify-between">
      <div className="bg-carolina/25 h-24 self-center p-10 mb-10 rounded-md border-blue-900 border-2">
        {"No activity detected!"}
      </div>
    </div>
  );
}
export default ActivityProfileContainer;
