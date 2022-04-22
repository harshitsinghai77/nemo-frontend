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

import { secondsToString } from "../../js/utils";
import apiClient from "../../apiClient";
import { CustomSpinner } from "../../components/Elements";

const AllTask = () => {
  const [loader, setLoader] = useState(true);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    apiClient.get_tasks().then((resp) => {
      setAllTasks(resp.data);
      setLoader(false);
    });
  }, []);

  return (
    <Box alignSelf="center" className="my-10">
      <Text size="large" color="brand" className="my-6">
        Your Last 10 Days Report
      </Text>
      {loader && <CustomSpinner />}
      <Table alignSelf="stretch">
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
            <TableCell scope="col" border="bottom">
              Date
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allTasks.map((el, index) => (
            <TableRow key={index}>
              <TableCell scope="row">
                <strong>{el.task_description}</strong>
              </TableCell>
              <TableCell>{secondsToString(el.duration)}</TableCell>
              <TableCell>{el.time}</TableCell>
              <TableCell>{el.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {allTasks.length <= 0 && (
        <Text size="large" color="brand" className="my-10">
          No Data Found. Create task, complete session and come back again. 🙂
        </Text>
      )}
    </Box>
  );
};

export default AllTask;
