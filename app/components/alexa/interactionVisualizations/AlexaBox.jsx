export default function AlexaBox(props) {
  const { date, content, userid, offset } = props;
  var origin;
  var message;
  if (!content || !date || !userid || !offset) {
    return;
  }
  const content_array = content.split(",");
  message = content_array;
  const display_date = new Date(date);
  display_date.setHours(display_date.getUTCHours() - offset);

  if (message.length === 1) {
    origin = "User";
  } else {
    origin = "System";
  }
  return (
    <div className={`flex group min-h-home_box_height mb-4`}>
      <div className="p-4 flex flex-col bg-white rounded-lg">
        <div className="w-96 font-semibold flex flex-row rounded bg-carolina border-2 border-blue-900 bg-opacity-60 pl-3">
          {"Interaction at"}
          &nbsp;
          <span>{display_date.toLocaleString()}</span>
        </div>
        <div className="flex flex-col justify-start text-base mt-3 space-y-3">
          <div className="font-semibold">
            {"Origin:"}&nbsp;
            <span className="font-normal">{origin}</span>
          </div>
          {message.length === 1 ? (
            <>
              <div className="font-semibold flex flex-row w-96">
                <div>{message[0]}</div>
              </div>
            </>
          ) : (
            <>
              <div className="font-normal self-center flex flex-row w-full ml-14 mr-14 justify-between min-w-screen">
                {message}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
