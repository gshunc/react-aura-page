"use client";
import Link from "next/link";
import NameLabel from "../home/NameLabel";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

const HeaderLinksContent = () => {
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid") ?? "";
  const router = useRouter();
  return userid !== "" ? (
    <div className="text-blue-900 font-medium flex flex-row text-lg space-x-5 mr-5">
      <NameLabel userid={userid} />
      <Link
        href={`/pages/home?userid=${encodeURIComponent(userid)}`}
        className="underline"
      >
        {"Home"}
      </Link>
      <Link href={"/"} className="underline">
        {"Log Out"}
      </Link>
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
