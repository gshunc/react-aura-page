import connectMongoDB from "../../../libs/mongoDB";
import Personal from "../../../models/Personal";

export async function GET() {
  await connectMongoDB();
  const activity = await Personal.find();
  return Response.json({ activity });
}
