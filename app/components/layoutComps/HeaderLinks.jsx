"use client";
import Link from "next/link";
import NameLabel from "../home/NameLabel";
import { useRouter, useParams } from "next/navigation";
import { Suspense } from "react";

export default function HeaderLinks() {
  const router = useRouter();
  const params = useParams();
  const { userid } = params;

  const handleLogout = () => {
    router.push("/");
  };
  return (
    <Suspense>
      <div className="text-blue-900 font-medium flex flex-row text-lg space-x-5 mr-5">
        {userid && <NameLabel userid={userid} />}
        <Link
          href={`/pages/home/${encodeURIComponent(userid)}`}
          className="underline"
        >
          {"Home"}
        </Link>
        <button onClick={handleLogout} className="underline">
          {"Log Out"}
        </button>
      </div>
    </Suspense>
  );
}
