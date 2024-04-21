import connectMongoDB from "../../../../../../libs/mongoDB";
import Personal from "../../../../../../models/Personal";

export async function GET(request, { params }) {
  await connectMongoDB();

  const { id, date, timezone } = params;
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
  return Response.json({ response: activity }, { status: 200 });
}
