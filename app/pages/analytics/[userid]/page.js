import AnalyticsClient from "@/app/components/analytics/graphing/AnalyticsClient";
import { getProfileInfoById, getAlexaInfoById } from "@/helpers/api_service";
import { countSteps } from "../../../../helpers/profile_helpers";

// TODO -> Pull out info from AnalyticsClient to here, graphboxes can be server components with props passed individually.
export default async function Analytics({ params }) {
  //Base component of project. Hosts all graphs, page header, etc. Also keeps track of date state from DatePicker.
  var date = new Date(Date.now());
  const userid = String(params.userid);

  async function setDate(newDate) {
    "use server";
    date = new Date(newDate);
  }

  let data;
  let alexaData;
  try {
    data = await getProfileInfoById(userid, date);
    alexaData = await getAlexaInfoById(userid, date);
  } catch (error) {
    console.error("Error fetching user actvity at analytics page root:", error);
    throw error;
  }
  const steps = countSteps(data);

  return (
    <AnalyticsClient
      userid={userid}
      date={date}
      data={data}
      alexaData={alexaData}
      steps={steps}
      setDate={setDate}
    />
  );
}
