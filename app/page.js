"use client";
import Header from "./components/Header";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";

async function login(password) {
  try {
    let res = await fetch(`/api/auth/login/${password}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Error fetching user data.");
    }
    return res.json();
  } catch (error) {
    console.error("Error in getProfileInfoById:", error);
    throw new Error(
      "Error fetching information about user. Details: " + error.message
    );
  }
}

export default function Home() {
  const router = useRouter();
  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userid = formData.get("userid");
    const password = formData.get("password");
    const res = await login(password);
    const confirmed = userid === res.response.userid;

    if (confirmed) {
      router.push(
        `/pages/home?userid=${encodeURIComponent(res.response.userid)}`
      );
    }
  }
  return (
    <>
      <main className="flex min-h-screen flex-col mb-5">
        <Header />
        <div>
          <form onSubmit={onSubmit} className="flex flex-col w-wide_graph ml-5">
            <input
              type="text"
              name="userid"
              placeholder="userID"
              required
              className="mt-5 rounded border-2 border-blue-900"
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              required
              className="mt-5 rounded border-2 border-blue-900"
            />
            <button
              type="submit"
              className=" w-auto mt-5 rounded border-2 border-blue-900"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
