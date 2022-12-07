import { useContext } from "react";
import { TextInput } from "grommet";

import { store } from "../store/store";
import { SET_CURRENT_TASK } from "../store/types";

export const InputTaskWhatAreYouWorkingOn = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const currentTask = globalState.state.currentTask;

  const onCurrentTaskChange = (e) => {
    dispatch({ type: SET_CURRENT_TASK, value: e.target.value });
  };

  return (
    <TextInput
      placeholder="What are you working on?"
      value={currentTask}
      onChange={onCurrentTaskChange}
      focusIndicator={false}
      plain
    />
  );
};
