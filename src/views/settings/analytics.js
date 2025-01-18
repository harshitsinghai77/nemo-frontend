import { useEffect, useState, useContext } from "react";
import { Box, Text } from "grommet";
import axios from "axios";

import { store } from "../../store/store";
import { SET_ANALYTICS } from "../../store/types";
import Statistics from "./statistics";
import DataChartComponent from "../../components/DataChart";

import { secondsToString, generateRandomNoDataMessage } from "../../js/utils";
import apiClient from "../../apiClient";
import { CustomSpinner } from "../../components/Elements";
import { numberToHours, secToHourMinuteSecond } from "../../js/utils";

const Analytics = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { daily_goal } = globalState.state.settings;
  const { analyticsData, currentGoal, bestSessionData, analytics_loaded_from_backend } = globalState.state.analytics

  const [loader, setLoader] = useState(false);
  const [weeklyData, setWeeklyData] = useState([]);
  const [weeklyLabels, setWeeklyLabels] = useState([]);
  const [bestDay, setBestDay] = useState()
  const [bestSession, setBestSession] = useState()

  function prepareData() {
    if (analyticsData.length == 0) return

    const labels = analyticsData.map((el) => el.weekday);
    const secToHrs = analyticsData.map((el) => secondsToString(el.total_count));

    // Determine best day from analytics
    const maxHrsIndex = secToHrs.indexOf(Math.max(...secToHrs));
    let [h, m] = secToHourMinuteSecond(analyticsData[maxHrsIndex].total_count);

    setWeeklyData(secToHrs)
    setWeeklyLabels(labels)
    setBestDay({
      bestDayDuration: `${h} hrs ${m} min`,
      bestDayDate: analyticsData[maxHrsIndex].weekday,
    })

    if (!bestSessionData) return

    [h, m] = secToHourMinuteSecond(bestSessionData.best_day_duration);

    setBestSession({
      best_day_full_date: bestSessionData.best_day_full_date,
      best_day_duration: `${h} hrs ${m} min`,
    })
  }

  function fetchData() {
    setLoader(true)
    axios.all([
      apiClient.get_analytics(),
      apiClient.get_statistics("current-goal"),
      apiClient.get_statistics("best-day"),
    ])
      .then(
        axios.spread((analytics, currentGoalResponse, bestDayResponse) => {

          // let currentGoal = currentGoalResponse?.data?.currentGoal;
          // if (currentGoal){
          //   // Extract and process current goal
          //   currentGoal = numberToHours(currentGoal);
          //   backendAnalytics['currentGoal'] = currentGoal
          // }

          const backendAnalytics = {
            analyticsData: analytics?.data,
            bestSessionData: bestDayResponse?.data,
            analytics_loaded_from_backend: true
          }

          dispatch({
            type: SET_ANALYTICS,
            value: backendAnalytics,
          });
          setLoader(false); // Data fetch complete
        })
      )
      .catch((error) => {
        setLoader(false);
      });
  }

  useEffect(() => {
    if (!analytics_loaded_from_backend) {
      fetchData();
    }
    prepareData()
  }, [analytics_loaded_from_backend]);

  return (
    <Box alignSelf="center" className="my-10">
      <Text size="large" color="brand" className="my-4">
        Deep Work Trends: Insights from the Past Week
      </Text>
      {loader ? (
        <CustomSpinner />
      ) : weeklyData.length > 0 ? (
        <DataChartComponent labels={weeklyLabels} data={weeklyData} />
      ) : (
        <Text size="large" color="brand" className="my-5">
          {generateRandomNoDataMessage()}
        </Text>
      )}
      {/* {daily_goal - currentGoal >= 0 && (
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
      )} */}
      {bestDay && <Statistics bestDay={bestDay} bestSession={bestSession} />}
    </Box>
  );
};

export default Analytics;
