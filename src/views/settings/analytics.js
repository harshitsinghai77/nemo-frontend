import { useEffect, useState } from "react";
import { Box } from "grommet";

import Statistics from "./statistics";
import DataChartComponent from "../../components/DataChart";

import { secondsToString } from "../../js/utils";
import apiClient from "../../apiClient";
import { CustomSpinner } from "../../components/Elements";
import { themePrimaryColor } from "../../themes";

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
        const secToHrs = data.map((el) => secondsToString(el.total_count));
        setWeeklyData(secToHrs);
        setWeeklyLabels(labels);
        setLoader(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Box alignSelf="center" className="my-12">
      <h1 className="text-2xl mb-2" style={{ color: themePrimaryColor }}>
        Last 7 days
      </h1>
      {loader && <CustomSpinner />}
      {weeklyData.length > 0 ? (
        <DataChartComponent labels={weeklyLabels} data={weeklyData} />
      ) : (
        !loader && (
          <>
            <h1 className="mx-auto text-gray-900">No data found.</h1>
            <h1 className="mx-auto text-gray-900">
              Complete a session and come back later.
            </h1>
          </>
        )
      )}

      <Statistics />
    </Box>
  );
};

export default Analytics;
