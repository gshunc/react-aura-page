export default function DataMonitoringInformation(unformattedData) {
  return (
    <>
      <div>
        {`Datapoints Collected on ${new Date(
          unformattedData.unformattedData[0]["time"]
        ).toLocaleDateString()}: `}
        <span className="font-semibold ">
          {unformattedData.unformattedData.length}
        </span>
      </div>
    </>
  );
}
