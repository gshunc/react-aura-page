"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function HeaderLinks() {
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid") ?? "";
  return (
    <div className="text-blue-900 font-semibold underline space-x-5 mr-5">
      <Link href={`/pages/home?userid=${encodeURIComponent(userid)}`}>
        {"Home"}
      </Link>
      <Link href={"/"}>{"Log Out"}</Link>
    </div>
  );
}
