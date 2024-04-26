import connectMongoDB from "../../../../../../libs/mongoDB";
import Activity from "../../../../../../models/Activity";
import { processMonitoringData } from "../../../../../../helpers/monitoring_helpers";

export async function GET(request, { params }) {
  await connectMongoDB();

  const { id, date, timezone } = params;
  const startOfDay = new Date(date);
  startOfDay.setHours(timezone, 0, 0);
  const endOfDay = new Date(new Date(date).setDate(startOfDay.getDate() + 1));
  endOfDay.setHours(0, 0, 0);
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

  events = events.length > 0 ? events : [];
  events = await processMonitoringData(events, date, timezone);
  return Response.json({ response: events }, { status: 200 });
}
