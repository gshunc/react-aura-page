export default function GraphBox({ title, content }) {
  return (
    <div className={`w-wide_graph min-h-graph_box_height bg-white rounded-lg`}>
      <div className="p-4 flex flex-col">
        <div className="font-semibold text-xl mb-3">{title}</div>
        <div className="flex flex-row justify-center text-base h-graph_height w-full">
          {content}
        </div>
      </div>
    </div>
  );
}
