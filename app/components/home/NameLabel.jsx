export default async function NameLabel({ userid }) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getName = async (id) => {
    //Makes call to API to fetch username.
    try {
      let res = await fetch(`${baseURL}/api/user_info/${id}`);
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
  };

  let name;
  try {
    const res = await getName(userid);
    name = res?.response?.name;
  } catch (error) {
    console.error("Error fetching name:", error);
  }

  return (
    <div className="flex flex-row mr-10">
      <div className="font-semibold text-lg ml-10">{`Welcome,`}&nbsp;</div>
      <span className="text-white font-normal">{name}</span>
    </div>
  );
}
