export default function DataMonitoringInformation(props) {
  const { data } = props;
  var count = 0;
  for (let i = 0; i < data.length; i++) {
    count += data[i].count;
  }
  return (
    <>
      <div>
        {`Datapoints Collected on ${new Date(
          data[0].time
        ).toLocaleDateString()}: `}
        <span className="font-semibold ">{count}</span>
      </div>
    </>
  );
}
