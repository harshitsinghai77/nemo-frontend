import { useEffect, useState, useContext } from "react";
import { Box, Text } from "grommet";
import axios from "axios";

import { store } from "../../store/store";
import Statistics from "./statistics";
import DataChartComponent from "../../components/DataChart";

import { secondsToString, generateRandomNoDataMessage } from "../../js/utils";
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
  const [bestSession, setBestSession] = useState();

  useEffect(() => {
    async function fetchData() {
      axios
        .all([
          apiClient.get_analytics(),
          apiClient.get_statistics("current-goal"),
          apiClient.get_statistics("best-day"),
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

              // Handling response from statistics/best-day
              if (responses[2].data) {
                const [h, m] = secToHourMinuteSecond(
                  responses[2].data.best_day_duration
                );
                const current_stats = {
                  best_day_full_date: responses[2].data["best_day_full_date"],
                  best_day_duration: `${h} hrs ${m} min`,
                };
                setBestSession(current_stats);
              }
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
    <Box alignSelf="center" className="my-10">
      <Text size="large" color="brand" className="my-4">
        Deep Work Trends: Insights from the Past Week
      </Text>
      {loader && <CustomSpinner />}
      {weeklyData.length > 0 ? (
        <DataChartComponent labels={weeklyLabels} data={weeklyData} />
      ) : (
        !loader && (
          <Text size="large" color="brand" className="my-5">
            {generateRandomNoDataMessage()}
          </Text>
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
      {bestDay && <Statistics bestDay={bestDay} bestSession={bestSession} />}
    </Box>
  );
};

export default Analytics;
