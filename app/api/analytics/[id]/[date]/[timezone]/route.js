import connectMongoDB from "../../../../../../libs/mongoDB";
import Personal from "../../../../../../models/Personal";
import { processData } from "../../../../../../utils/dataProcessing";

export async function GET(request, { params }) {
  const { id, date, timezone } = params;
  await connectMongoDB();
  const startOfDay = new Date(date);
  startOfDay.setHours(timezone, 0, 0);
  const endOfDay = new Date(new Date(date).setDate(startOfDay.getDate() + 1));
  endOfDay.setHours(0, 0, 0);

  let activity = await Personal.aggregate([
    {
      $match: {
        userid: id,
      },
    },
    {
      $project: {
        activity: {
          $filter: {
            input: "$activity",
            cond: {
              $and: [
                {
                  $gte: ["$$this.time", new Date(startOfDay.toISOString())],
                },
                {
                  $lt: ["$$this.time", new Date(endOfDay.toISOString())],
                },
              ],
            },
          },
        },
      },
    },
  ]);
  activity = activity.length > 0 ? activity[0].activity : [];
  activity = await processData(activity, date, timezone);
  return Response.json({ response: activity }, { status: 200 });
}
