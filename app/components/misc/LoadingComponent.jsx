import LoadingSpinner from "./LoadingSpinner";
export default function LoadingComponent() {
  return (
    <div className="flex flex-row">
      <p className="mr-5 mt-1">{"Visualizing patient data..."}</p>
      <LoadingSpinner />
    </div>
  );
}
