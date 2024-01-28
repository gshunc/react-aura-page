export default function GraphBox({ title, content, isLarge }) {
  return (
    <div
      //Below Custom Styles can be found in tailwind.config.js in root
      className={`${
        isLarge ? "w-wide_graph" : "w-regular_graph"
      } h-graph_height bg-white border-black rounded-lg mt-5`}
    >
      <div className="p-4 flex flex-col min-h-graph_height">
        <div className="font-bold text-xl">{title}</div>
        <div className="text-base h-max">GRAPH GOES HERE</div>
      </div>
    </div>
  );
}
