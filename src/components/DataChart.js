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
        },
      ],
    },
  };

  return <Bar width={551} height={350} data={data} options={options} />;
};

export default DataChartComponent;
