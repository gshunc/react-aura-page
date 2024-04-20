"use client";
import Link from "next/link";
import NameLabel from "../home/NameLabel";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

export default function HeaderLinks() {
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid") ?? "";
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return userid ? (
    <Suspense>
      <div className="text-blue-900 font-medium flex flex-row text-lg space-x-5 mr-5">
        <NameLabel userid={userid} />
        <Link
          href={`/pages/home?userid=${encodeURIComponent(userid)}`}
          className="underline"
        >
          {"Home"}
        </Link>
        <button onClick={handleLogout} className="underline">
          {"Log Out"}
        </button>
      </div>
    </Suspense>
  ) : null;
}
