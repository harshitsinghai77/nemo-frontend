import { Bar } from "react-chartjs-2";

const DataChartComponent = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "# of hrs",
        data: props.data,
        backgroundColor: "rgb(92, 229, 180)",
        borderColor: "rgb(92, 229, 180)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
          },
          ticks: { min: 0 },
        },
      ],
    },
  };

  return <Bar width={551} height={400} data={data} options={options} />;
};

export default DataChartComponent;
