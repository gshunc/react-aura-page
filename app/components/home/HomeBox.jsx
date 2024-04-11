export default function HomeBox({ title, content }) {
  return (
    <div
      className={`group w-home_box_width min-h-home_box_height bg-white rounded-lg`}
    >
      <div className="p-4 flex flex-col">
        <div className="font-semibold group-hover:underline text-xl text-center">
          {title}
        </div>
        <div className="flex flex-row justify-center text-base h-home_box_height w-full mt-3">
          {content}
        </div>
      </div>
    </div>
  );
}
