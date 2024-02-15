import connectMongoDB from "../../../../libs/mongoDB";
import Personal from "../../../../models/Personal";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const activity = await Personal.findOne({ userid: id }, { activity: 1 });
  return Response.json({ response: activity }, { status: 200 });
}
