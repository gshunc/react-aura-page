export default function GraphBox({ title, content, isLarge }) {
  return (
    <div
      className={`${
        isLarge ? "w-wide_graph" : "w-regular_graph"
      } max-h-container bg-white rounded-lg mt-5 border-2 hover:border-blue-900`}
    >
      <div className="p-4 flex flex-col">
        <div className="font-bold text-xl">{title}</div>
        <div className="flex flex-row justify-center text-base h-containter w-full">
          {content}
        </div>
      </div>
    </div>
  );
}
