import connectMongoDB from "../../../libs/mongoDB";
import Personal from "../../../models/Personal";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const activity = await Personal.find();
  return NextResponse.json({ activity });
}
