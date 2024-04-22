import connectMongoDB from "../../../../../../libs/mongoDB";
import Personal from "../../../../../../models/Personal";

export async function GET(request, { params }) {
  await connectMongoDB();
  const { id, date, timezone } = params;
  const startOfDay = new Date(date);
  startOfDay.setHours(timezone, 0, 0);
  const endOfDay = new Date(new Date(date).setDate(startOfDay.getDate() + 1));
  endOfDay.setHours(0, 0, 0);

  console.time();
  const user = await Personal.aggregate([
    {
      $match: {
        userid: id,
      },
    },
    {
      $unwind: "$activity",
    },
    {
      $match: {
        "activity.time": {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    {
      $project: {
        _id: 0,
        activity: 1,
      },
    },
  ]);
  console.time();
  console.log(user.length);

  const activity = user ? user.map((a) => a.activity) : [];

  return Response.json({ response: activity }, { status: 200 });
}
