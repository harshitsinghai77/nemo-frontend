import { DataChart } from "grommet";

const DataChartComponent = () => {
  const data = [
    { date: "Mon", amount: 28 },
    { date: "Tues", amount: 41 },
    { date: "Wed", amount: 47 },
    { date: "Thu", amount: 57 },
    { date: "Fri", amount: 43 },
    { date: "Sat", amount: 53 },
    { date: "Sun", amount: 33 },
  ];

  return (
    <DataChart
      data={data}
      series={["date", "amount"]}
      chart={[
        {
          property: "amount",
          type: "bar",
          thickness: "medium",
        },
      ]}
      axis={{
        x: { property: "date", granularity: "fine", color: "red" },
        y: { property: "amount", granularity: "fine" },
      }}
      guide={{ y: { granularity: "fine" } }}
      style={{ color: "black" }}
    />
  );
};

export default DataChartComponent;
