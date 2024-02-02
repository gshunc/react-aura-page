export default function GraphBox({ title, content, isLarge }) {
  return (
    <div
      className={`${
        isLarge ? "w-wide_graph" : "w-regular_graph"
      } h-graph_height bg-white border-black rounded-lg mt-5`}
    >
      <div className="p-4 flex flex-col min-h-graph_height">
        <div className="font-bold text-xl">{title}</div>
        <div className="text-base h-max w-full">{content}</div>
      </div>
    </div>
  );
}
