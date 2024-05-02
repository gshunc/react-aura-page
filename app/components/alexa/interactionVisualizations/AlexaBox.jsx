export default function AlexaBox(props) {
  const { date, content, userid } = props;
  var origin;
  var message;
  if (!content || !date || !userid) {
    return;
  }
  const content_array = content.split(",");
  // if (content_array.length == 1) {
  //   if (content === "step count query") {
  //     origin = `${userid}`;
  //     message = [`${userid} asked about their step count.`];
  //   } else if (content === "heart rate query") {
  //     origin = `${userid}`;
  //     message = [`${userid} asked about their heart rate.`];
  //   } else if (content === "calory query") {
  //     origin = `${userid}`;
  //     message = [`${userid} asked about calories burned.`];
  //   } else if (content === "low step notification") {
  //     origin = "System";
  //     message = ["Not enough movement in the past two hours."];
  //   } else if (content === "step goal achieved") {
  //     origin = "System";
  //     message = [`${userid} achieved their step goal.`];
  //   } else {
  //     origin = "System";
  //     message = [content];
  //   }
  // } else {
  //   if (content_array[0] == "d") {
  //     message = ["Morning Checkup." + " "];
  //     origin = "System";
  //     if (content_array[1] == "y") {
  //       message.push(`${userid} had a good night's sleep.` + " ");
  //     } else {
  //       message.push(`${userid} did not have a good night's sleep.`) + " ";
  //     }
  //     if (content_array[3] == "y") {
  //       message.push(`${userid} ate breakfast.`) + " ";
  //     } else {
  //       message.push(`${userid} did not eat breakfast.` + " ");
  //     }
  //   }
  //   if (content_array[0] == "n") {
  //     message = ["Evening Checkups." + " "];
  //     origin = "System";
  //     if (content_array[1] == "y") {
  //       message.push(`${userid} drank enough water today. ` + " ");
  //     } else {
  //       message.push(`${userid} did not drink enough water today. ` + " ");
  //     }
  //     if (content_array[3] == "y") {
  //       message.push(`${userid} ate dinner.` + " ");
  //     } else {
  //       message.push(`${userid} did not eat dinner. ` + " ");
  //     }
  //   }
  //   message = [`${userid} reported feeling: ` + content_array[2] + "." + " "];
  //   if (content_array[4] == "y") {
  //     message.push(`${userid} took their medicine. ` + " ");
  //   } else {
  //     message.push(`${userid} did not take their medicine. ` + " ");
  //   }
  // }
  message = content_array;

  return (
    <div className={`flex group min-h-home_box_height mb-4`}>
      <div className="p-4 flex flex-col bg-white rounded-lg">
        <div className="w-96 font-semibold flex flex-row rounded bg-carolina border-2 border-blue-900 bg-opacity-60 pl-3">
          {"Interaction at"}
          &nbsp;
          <span>{new Date(date)?.toLocaleTimeString("en-US")}</span>
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
                <div>{message[0]}</div>
                <div>-&gt;</div>
                <div>{message[1]}</div>
                <div>-&gt;</div>
                <div>{message[2]}</div>
                <div>-&gt;</div>
                <div>{message[3]}</div>
                <div>-&gt;</div>
                <div>{message[4]}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
