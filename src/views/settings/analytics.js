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
  const { analyticsData, analytics_loaded_from_backend } = globalState.state.analytics
  const { tasksData } = globalState.state.tasks

  const [loader, setLoader] = useState(false);
  const [weeklyData, setWeeklyData] = useState([]);
  const [weeklyLabels, setWeeklyLabels] = useState([]);
  const [bestDay, setBestDay] = useState()
  const [bestSession, setBestSession] = useState()
  const [currentGoal, setCurrentGoal] = useState(0)

  function prepareData() {
    if (analyticsData.length === 0) return

    const labels = analyticsData.map((el) => el.weekday);
    const secToHrs = analyticsData.map((el) => secondsToString(el.total_count));

    // Determine best day from analytics locally
    const maxHrsIndex = secToHrs.indexOf(Math.max(...secToHrs));
    let [h, m] = secToHourMinuteSecond(analyticsData[maxHrsIndex].total_count);

    setWeeklyData(secToHrs)
    setWeeklyLabels(labels)
    setBestDay({
      bestDayDuration: `${h} hrs ${m} min`,
      bestDayDate: analyticsData[maxHrsIndex].weekday,
    })

    if (tasksData.length === 0) return
    // Determine best session from tasksData locally
    const sessionDurations = tasksData.map((el) => ({
      created_at: el.created_at,
      duration: el.duration
    }));

    
    // Find the session with the maximum duration
    const maxDurationSession = sessionDurations.reduce((maxSession, currentSession) => {
      if (currentSession.duration > maxSession.duration) {
        return currentSession;
      } else if (currentSession.duration === maxSession.duration) {
        // If the duration is the same, compare `created_at`
        return new Date(currentSession.created_at) > new Date(maxSession.created_at) ? currentSession : maxSession;
      }
      return maxSession;
    }, { duration: 0, created_at: '' });

    // Convert the duration to hours, and minutes
    let [h_best_session, m_best_session] = secToHourMinuteSecond(maxDurationSession.duration);

    const bestSessionDate = new Date(maxDurationSession.created_at);
    const formattedDateTime = bestSessionDate.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    // Set the best session data
    setBestSession({
      best_session_full_date: formattedDateTime,
      best_session_duration: `${h_best_session} hrs ${m_best_session} min`,
    });

    // Determine current goal from tasksData locally
    const currentDate = new Date().toLocaleDateString(); // Get today's date in the same format
    const todaySessions = tasksData.filter(el => {
      const sessionDate = new Date(el.created_at).toLocaleDateString(); 
      return sessionDate === currentDate; // Compare with today's date
    });

    // Calculate the sum of the durations for today's sessions
    const currentGoalHours = todaySessions.reduce((total, el) => total + el.duration, 0);
    const currentGoal = numberToHours(currentGoalHours);
    setCurrentGoal(currentGoal)
  }

  function fetchData() {
    setLoader(true)
    axios.all([
      apiClient.get_analytics(),
      // apiClient.get_statistics("current-goal")
      // apiClient.get_statistics("best-day"),
    ])
      .then(
        axios.spread((analytics) => {

          const backendAnalytics = {
            analyticsData: analytics?.data,
            // bestSessionData: bestDayResponse?.data,
            analytics_loaded_from_backend: true
          }
          
          // if (currentGoalResponse?.data?.current_goal) {
          //   let currentGoal = currentGoalResponse.data.current_goal;
          //   currentGoal = numberToHours(currentGoal);
          //   backendAnalytics['currentGoal'] = currentGoal
          // }

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
        Deep Work Insights from the Past Week
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
      {!loader && daily_goal - currentGoal >= 0 && (
        <>
           <Text className="mt-8" size="medium" color="brand">
            Keep going! You've completed {currentGoal % 1 === 0 ? `${currentGoal}` : currentGoal.toFixed(2)} hrs of deep work today.
          </Text>
          <Text className="mt-0" size="medium" color="brand">
            Work for another {(daily_goal - currentGoal) % 1 === 0 ? `${daily_goal - currentGoal}` : (daily_goal - currentGoal).toFixed(2)} hrs to achieve your daily goal.
          </Text>
        </>
      )}
      {!loader && bestDay && <Statistics bestDay={bestDay} bestSession={bestSession} />}
    </Box>
  );
};

export default Analytics;
