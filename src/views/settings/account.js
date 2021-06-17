import { useContext } from "react";
import { Box, TextInput, Button } from "grommet";

import { store } from "../../store/store";
import {
  SET_USERNAME,
  SET_EMAIL,
  SET_FIRST_NAME,
  SET_LAST_NAME,
} from "../../store/types";

import {
  ParagraphTitle,
  BorderLine,
  CustomBox,
} from "../../components/Elements";

const AccountSettings = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { username, email, firstName, lastName } = globalState.state.user;

  const onChangeUsername = (value) =>
    dispatch({
      type: SET_USERNAME,
      value: value,
    });

  const onChangeEmail = (value) =>
    dispatch({
      type: SET_EMAIL,
      value: value,
    });

  const onChangeFirstName = (value) =>
    dispatch({
      type: SET_FIRST_NAME,
      value: value,
    });
  const onChangeLastName = (value) =>
    dispatch({
      type: SET_LAST_NAME,
      value: value,
    });

  const content = (
    <div className="mt-10">
      <CustomBox>
        <ParagraphTitle text="Username" />
        <Box>
          <TextInput
            placeholder="username"
            value={username}
            size="xsmall"
            onChange={(event) => onChangeUsername(event.target.value)}
          />
        </Box>
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="Email" />
        <Box>
          <TextInput
            placeholder="type here"
            value={email}
            size="xsmall"
            onChange={(event) => onChangeEmail(event.target.value)}
          />
        </Box>
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="First Name" />
        <Box>
          <TextInput
            placeholder="type here"
            value={firstName}
            size="xsmall"
            onChange={(event) => onChangeFirstName(event.target.value)}
          />
        </Box>
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="Last Name" />
        <Box>
          <TextInput
            placeholder="type here"
            value={lastName}
            size="xsmall"
            onChange={(event) => onChangeLastName(event.target.value)}
          />
        </Box>
      </CustomBox>

      <CustomBox>
        <Button secondary label="Update" />
      </CustomBox>

      <BorderLine />

      <Box margin={{ vertical: "small" }}>
        <ParagraphTitle text="Want to permanently delete your Noisli account?" />
      </Box>
      <div className="mb-20">
        <Button label="Delete" color="red" />
      </div>
    </div>
  );

  return content;
};

export default AccountSettings;
