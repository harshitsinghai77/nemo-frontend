import { useEffect, useState, useContext } from "react";
import { Box, Text } from "grommet";
import axios from "axios";

import { store } from "../../store/store";
import Statistics from "./statistics";
import DataChartComponent from "../../components/DataChart";

import { secondsToString } from "../../js/utils";
import apiClient from "../../apiClient";
import { CustomSpinner } from "../../components/Elements";
import { numberToHours, secToHourMinuteSecond } from "../../js/utils";

const Analytics = () => {
  const globalState = useContext(store);
  const { daily_goal } = globalState.state.settings;

  const [weeklyData, setWeeklyData] = useState([]);
  const [weeklyLabels, setWeeklyLabels] = useState([]);
  const [currentGoal, setCurrentGoal] = useState();
  const [loader, setLoader] = useState(true);
  const [bestDay, setBestDay] = useState();

  useEffect(() => {
    async function fetchData() {
      axios
        .all([
          apiClient.get_analytics(),
          apiClient.get_statistics("current-goal"),
        ])
        .then(
          axios.spread((...responses) => {
            let { current_goal } = responses[1].data;
            current_goal = numberToHours(current_goal);
            setCurrentGoal(current_goal);
            const { data } = responses[0];
            if (data) {
              const labels = data.map((el) => el.weekday);
              const secToHrs = data.map((el) =>
                secondsToString(el.total_count)
              );

              // Best day is the day with the most number of hrs
              const maximumHrsIndex = secToHrs.indexOf(Math.max(...secToHrs));
              const [h, m] = secToHourMinuteSecond(
                data[maximumHrsIndex]["total_count"]
              );

              setBestDay({
                bestDayDuration: `${h} hrs ${m} min`,
                bestDayDate: data[maximumHrsIndex]["weekday"],
              });
              setWeeklyData(secToHrs);
              setWeeklyLabels(labels);
              setLoader(false);
            }
          })
        )
        .catch((err) => {
          setLoader(false);
        });
    }
    fetchData();
  }, []);

  return (
    <Box alignSelf="center" className="my-12">
      <Text size="large" color="brand">
        Last 7 days
      </Text>
      {loader && <CustomSpinner />}
      {weeklyData.length > 0 ? (
        <DataChartComponent labels={weeklyLabels} data={weeklyData} />
      ) : (
        !loader && (
          <>
            <h1 className="mx-auto text-gray-900">No data found.</h1>
            <h1 className="mx-auto text-gray-900">
              No Analytics found. Complete a session and come back later 🙂.
            </h1>
          </>
        )
      )}
      {daily_goal - currentGoal >= 0 && (
        <>
          <Text className="mt-8" size="medium" color="brand">
            Keep going! You've completed {currentGoal.toFixed(2)} hours of deep
            work today.
          </Text>
          <Text className="mt-8" size="medium" color="brand">
            Work for another {(daily_goal - currentGoal).toFixed(2)} hrs to
            achieve your daily goal.
          </Text>
        </>
      )}
      {bestDay && <Statistics bestDay={bestDay} />}
    </Box>
  );
};

export default Analytics;
