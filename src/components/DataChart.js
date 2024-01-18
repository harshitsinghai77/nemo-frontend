import { Bar } from "react-chartjs-2";

const getCategoryPercentage = (totalLength) => {
  if (totalLength <= 4) {
    return totalLength / 10;
  }
  return 0.8;
};

const DataChartComponent = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "# of hrs",
        data: props.data,
        backgroundColor: "#6FFFB0",
        borderColor: "#6FFFB0",
        borderWidth: 1,
        categoryPercentage: getCategoryPercentage(props.labels.length), // Set category width to 80% if multiple labels
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
