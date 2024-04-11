export default function AlexaBox(props) {
  const { date, content } = props;
  var origin;
  var message;
  if (content === "step count query") {
    origin = "User";
    message = "User asked about their step count";
  } else if (content === "step goal achieved") {
    origin = "System";
    message = "User achieved their step goal";
  } else {
    origin = "System";
    message = content;
  }
  return (
    <div
      className={`group w-home_box_width min-h-home_box_height bg-white rounded-lg mb-4`}
    >
      <div className="p-4 flex flex-col">
        <div className="font-bold flex flex-row rounded bg-carolina border-2 border-blue-900 bg-opacity-60 pl-3">
          {"Interaction at"}
          &nbsp;
          <span>{new Date(date)?.toLocaleTimeString("en-US")}</span>
        </div>
        <div className="flex flex-col justify-start text-base w-full mt-3 space-y-3">
          <div className="font-bold">
            {"Origin:"}&nbsp;
            <span className="font-normal">{origin}</span>
          </div>
          <div className="font-bold">
            {"Content:"}&nbsp;
            <span className="font-normal">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
