import connectMongoDB from "../../../../../../libs/mongoDB";
import Personal from "../../../../../../models/Personal";

export async function GET(request, { params }) {
  await connectMongoDB();

  const { id, date, timezone } = params;
  var startOfDay = new Date(date);
  if (startOfDay.getHours() - timezone < 0) {
    startOfDay = new Date(startOfDay.getTime() - 86400000);
  }
  startOfDay.setHours(Number(timezone), 0, 0);
  const endOfDay = new Date(new Date(date).setDate(startOfDay.getDate() + 1));
  endOfDay.setHours(Number(timezone), 0, 0);

  let events = await Personal.aggregate([
    {
      $match: {
        userid: id,
      },
    },
    {
      $project: {
        events: {
          $filter: {
            input: "$events",
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
  events = events.length > 0 ? events[0].events : [];
  return Response.json({ response: events }, { status: 200 });
}
