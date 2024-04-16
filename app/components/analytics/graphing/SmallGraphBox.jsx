import Question from "../../misc/Question";
export default function SmallGraphBox({ title, content, about }) {
  return (
    <div className={`w-72 min-h-graph_box_height bg-white rounded-lg`}>
      <div className="p-4 flex flex-col">
        <div className="flex flex-row justify-between font-semibold text-xl mb-3">
          {title}
          <Question content={about}></Question>
        </div>
        <div className="flex flex-row justify-center text-base h-graph_height w-full">
          {content}
        </div>
      </div>
    </div>
  );
}
