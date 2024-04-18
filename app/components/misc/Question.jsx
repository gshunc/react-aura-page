export default function Question(props) {
  const { content } = props;

  if (!content) {
    return;
  }
  return (
    <main className="flex flex-col relative">
      <div className="peer w-8 h-8 rounded-full bg-blue-900 hover:bg-carolina text-center content-center text-white font-semibold select-none hover:border-2 border-carolina">
        {"?"}
      </div>
      <div className="hidden w-48 p-4 peer-hover:inline absolute top-9 right-0 self-center bg-gray-200 border-2 border-blue-900 rounded-md font-light text-sm text-center">
        {content}
      </div>
    </main>
  );
}
