"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

const HeaderLinksContent = () => {
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid") ?? "";
  const router = useRouter();
  return userid !== "" ? (
    <div className="text-blue-900 font-semibold underline space-x-5 mr-5">
      <Link href={`/pages/home?userid=${encodeURIComponent(userid)}`}>
        {"Home"}
      </Link>
      <Link href={"/"}>{"Log Out"}</Link>
    </div>
  ) : (
    router.push("/")
  );
};

export default function HeaderLinks() {
  return (
    <Suspense>
      <HeaderLinksContent></HeaderLinksContent>
    </Suspense>
  );
}
