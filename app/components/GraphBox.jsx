export default function GraphBox({ title, content }) {
  return (
    <div
      className={`w-wide_graph min-h-graph_box_height bg-white rounded-lg mt-5 border-2 hover:border-blue-900`}
    >
      <div className="p-4 flex flex-col">
        <div className="font-bold text-xl">{title}</div>
        <div className="flex flex-row justify-center text-base h-graph_height w-full">
          {content}
        </div>
      </div>
    </div>
  );
}
