import connectMongoDB from "../../../libs/mongoDB";
import Personal from "../../../models/Personal";
import { NextApiRequest, NextApiResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const activity = await Personal.find();
  return NextApiResponse.json({ activity });
}
