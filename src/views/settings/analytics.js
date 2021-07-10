import { useEffect, useState } from "react";
import { Box } from "grommet";

import { secondsToHms } from "../../js/utils";
import apiClient from "../../apiClient";
import DataChartComponent from "../../components/DataChart";
import { CustomSpinner } from "../../components/Elements";

const Analytics = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [weeklyLabels, setWeeklyLabels] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await apiClient.get_analytics();
      const { data } = res;
      if (data) {
        const labels = data.map((el) => el.weekday);
        const secToHrs = data.map((el) => secondsToHms(el.total_count));
        setWeeklyData(secToHrs);
        setWeeklyLabels(labels);
        setLoader(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Box alignSelf="center" className="my-12">
      {loader && <CustomSpinner />}
      {weeklyData.length > 0 ? (
        <DataChartComponent labels={weeklyLabels} data={weeklyData} />
      ) : (
        !loader && <h1 className="mx-auto text-gray-900">No data found.</h1>
      )}
    </Box>
  );
};

export default Analytics;
