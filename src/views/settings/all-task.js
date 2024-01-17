import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "grommet";
import { Trash } from "grommet-icons";
import moment from "moment";

import {
  secondsToHrsMinString,
  generateRandomNoDataMessage,
} from "../../js/utils";
import apiClient from "../../apiClient";
import { CustomSpinner } from "../../components/Elements";

const AllTask = () => {
  const [loader, setLoader] = useState(true);
  const [allTasks, setAllTasks] = useState([]);
  const [bucket, setBucket] = useState();

  useEffect(() => {
    apiClient
      .get_tasks()
      .then((resp) => {
        setAllTasks(resp.data);
        createBuckets(resp.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, []);

  const createBuckets = (tasksArray) => {
    const dict = {};

    tasksArray.forEach((task) => {
      if (dict.hasOwnProperty(task.date)) {
        // if date exists in dict, group all task belonging to same date
        dict[task.date].tasks.push(task);
      } else {
        // else create new date
        dict[task.date] = {
          total_sum: task.total_duration,
          tasks: [task],
        };
      }
    });
    setBucket(dict);
  };

  const deleteTask = (deketed_task_key, dateKey) => {
    if (!deketed_task_key) return;

    apiClient.remove_tasks(deketed_task_key).then((resp) => {
      const { success } = resp.data;
      if (success) {
        removeTaskFromUI(deketed_task_key, dateKey);
      }
    });
  };

  const removeTaskFromUI = (deketed_task_key, dateKey) => {
    // Find the duration of the current index task.
    const currentIndexDuration = bucket[dateKey].tasks.find(
      (x) => x.key === deketed_task_key
    ).duration;

    // Subtract duration of the current index from the total_sum of the corresponding date.
    const newTotalSum = bucket[dateKey].total_sum - currentIndexDuration;

    // Filter current task from all the tasks in the date
    const alteredDataKeyBucket = bucket[dateKey].tasks.filter(
      (task) => task.key !== deketed_task_key
    );

    // create newBucket after removing the index task
    const newBucket = {
      ...bucket,
      [dateKey]: {
        total_sum: newTotalSum,
        tasks: alteredDataKeyBucket,
      },
    };

    if (alteredDataKeyBucket.length <= 0) {
      // if bucket is empty, remove they key (i.e remove date)
      delete newBucket[dateKey];
    }
    setBucket(newBucket);
  };

  return (
    <Box alignSelf="center" className="my-10">
      <Text size="large" color="brand" className="my-6">
        Your Last 10 Days Report
      </Text>
      {loader && <CustomSpinner />}

      {bucket &&
        Object.keys(bucket).map((dateKey, key) => (
          <Table
            alignSelf="stretch"
            caption={`Tasks - ${dateKey}. Total hours ${secondsToHrsMinString(
              bucket[dateKey].total_sum
            )}`}
            key={key}
            className="mb-8"
          >
            <TableHeader>
              <TableRow>
                <TableCell scope="col" border="bottom">
                  Task Description
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Duration
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Time
                </TableCell>
                {/* <TableCell scope="col" border="bottom">
                  Date
                </TableCell> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {bucket[dateKey].tasks.map((el) => (
                <TableRow key={el.key}>
                  <TableCell scope="row">
                    <strong>{el.task_description}</strong>
                  </TableCell>
                  <TableCell>{secondsToHrsMinString(el.duration)}</TableCell>
                  <TableCell>
                    {moment(el.created_at).local().format("HH:mm")}
                    &nbsp;
                    <Trash
                      size="small"
                      onClick={() => deleteTask(el.key, dateKey)}
                    />
                  </TableCell>
                  {/* <TableCell>{el.date}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}

      {!loader && allTasks.length <= 0 && (
        <Text size="large" color="brand" className="my-10">
          {generateRandomNoDataMessage()}
        </Text>
      )}
    </Box>
  );
};

export default AllTask;
