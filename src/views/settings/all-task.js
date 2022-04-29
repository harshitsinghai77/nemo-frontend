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

import { secondsToHrsMinString } from "../../js/utils";
import apiClient from "../../apiClient";
import { CustomSpinner } from "../../components/Elements";

const AllTask = () => {
  const [loader, setLoader] = useState(true);
  const [allTasks, setAllTasks] = useState([]);
  const [bucket, setBucket] = useState();

  useEffect(() => {
    apiClient.get_tasks().then((resp) => {
      setAllTasks(resp.data);
      createBuckets(resp.data);
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

  const deleteTask = (task_id, dateKey) => {
    if (!task_id) return;

    apiClient.remove_tasks(task_id).then((resp) => {
      const { success } = resp.data;
      if (success) {
        console.log(resp.data);
        deleteTaskFromUI(task_id, dateKey);
      }
    });
  };

  const deleteTaskFromUI = (task_id, dateKey) => {
    // Find the duration of the current index task.
    const currentIndexDuration = bucket[dateKey].tasks.find(
      (x) => x.id === task_id
    ).duration;

    // Subtract duration of the current index from the total_sum of the corresponding date.
    const newTotalSum = bucket[dateKey].total_sum - currentIndexDuration;

    // Filter current task from all the tasks in the date
    const alteredDataKeyBucket = bucket[dateKey].tasks.filter(
      (task) => task.id !== task_id
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
        Object.keys(bucket).map((dateKey, index) => (
          <Table
            alignSelf="stretch"
            caption={`Tasks - ${dateKey}. Total hours ${secondsToHrsMinString(
              bucket[dateKey].total_sum
            )}`}
            key={index}
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
                <TableRow key={el.id}>
                  <TableCell scope="row">
                    <strong>{el.task_description}</strong>
                  </TableCell>
                  <TableCell>{secondsToHrsMinString(el.duration)}</TableCell>
                  <TableCell>
                    {el.time} &nbsp;
                    <Trash
                      size="small"
                      onClick={() => deleteTask(el.id, dateKey)}
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
          No Data Found. Create task, complete session and come back again. 🙂
        </Text>
      )}
    </Box>
  );
};

export default AllTask;
