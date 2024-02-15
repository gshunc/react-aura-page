import connectMongoDB from "../../../../../libs/mongoDB";
import Personal from "../../../../../models/Personal";

export async function GET(request, { params }) {
  const { password } = params;
  await connectMongoDB();
  const user = await Personal.findOne({ uiPass: password }, { userid: 1 });
  if (!user) {
    return NextResponse.json({ response: "User not found" }, { status: 404 });
  }
  if (!user.userid) {
    return NextResponse.json(
      { response: "Userid not found for the user" },
      { status: 500 }
    );
  }
  return Response.json({ response: user }, { status: 200 });
}
