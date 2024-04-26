import connectMongoDB from "../../../../../../libs/mongoDB";
import Activity from "../../../../../../models/Activity";
import { processMonitoringData } from "../../../../../../helpers/monitoring_helpers";

export async function GET(request, { params }) {
  await connectMongoDB();

  const { id, date, timezone } = params;
  const startOfDay = new Date(date);
  startOfDay.setHours(timezone, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(timezone + 24, 0, 0);
  console.log(startOfDay);
  console.log(endOfDay);
  let events = await Activity.aggregate([
    {
      $match: {
        "metadata.userid": id,
        time: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    {
      $project: {
        "metadata.userid": 1,
        probabilities: 1,
        time: 1,
      },
    },
  ]);
  events = await processMonitoringData(events, date, timezone);
  events = events.length > 0 ? events : [];
  return Response.json({ response: events }, { status: 200 });
}
