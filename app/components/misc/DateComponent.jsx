import DatePicker from "react-datepicker";
export default function DateComponent(props) {
  const { date, onChange } = props;
  return (
    <div className="flex flex-row items-center mt-5">
      {" "}
      <div className="font-semibold text-lg ml-10 mr-2">{`Choose your date: `}</div>
      <DatePicker
        selected={date}
        onChange={(date) => onChange(date)}
        maxDate={new Date(Date.now())}
        className="rounded border-2 border-transparent hover:border-blue-900 focus:border-blue-900"
      />
    </div>
  );
}