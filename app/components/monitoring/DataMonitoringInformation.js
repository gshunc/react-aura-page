export default function DataMonitoringInformation(unformattedData) {
  var count = 0;
  for (let i = 0; i < unformattedData.unformattedData.length; i++) {
    count += unformattedData.unformattedData[i].count;
  }
  return (
    <>
      <div>
        {`Datapoints Collected on ${new Date(
          unformattedData.unformattedData[0].time
        ).toLocaleDateString()}: `}
        <span className="font-semibold ">{count}</span>
      </div>
    </>
  );
}
