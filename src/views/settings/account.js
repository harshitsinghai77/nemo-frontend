import { useEffect, useContext, useState } from "react";
import { Box, TextInput, Button } from "grommet";

import { client } from "../../apiClient";
import { store } from "../../store/store";
import {
  SET_USERNAME,
  SET_EMAIL,
  SET_FAMILY_NAME,
  SET_GIVEN_NAME,
  SET_USER_ACCOUNT,
} from "../../store/types";
import {
  ParagraphTitle,
  BorderLine,
  CustomBox,
  CustomSpinner,
} from "../../components/Elements";

const AccountSettings = () => {
  const [loader, setLoader] = useState(true);
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { username, email, given_name, family_name } =
    globalState.state.userAccount;

  const fetchData = async () => {
    const res = await client.get("/account");
    const { data } = res;

    dispatch({
      type: SET_USER_ACCOUNT,
      value: data,
    });

    setLoader(false);
  };

  useEffect(() => {
    if (!email || !given_name || !family_name) {
      fetchData();
    } else {
      setLoader(false);
    }
  }, []);

  const onSubmit = async () => {
    const updated = {
      given_name: given_name,
      family_name: family_name,
      username: username,
      email: email,
    };
    const resp = await client.patch("/account", updated);
    console.log(resp);
  };

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
      type: SET_GIVEN_NAME,
      value: value,
    });

  const onChangeLastName = (value) => {
    dispatch({
      type: SET_FAMILY_NAME,
      value: value,
    });
  };

  const content = (
    <div className="mt-10">
      <CustomBox>
        <ParagraphTitle text="Username" />
        <Box>
          <TextInput
            placeholder="username"
            value={username || ""}
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
            value={given_name}
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
            value={family_name}
            size="xsmall"
            onChange={(event) => onChangeLastName(event.target.value)}
          />
        </Box>
      </CustomBox>

      <CustomBox>
        <Button secondary label="Update" onClick={onSubmit} />
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

  return loader ? <CustomSpinner /> : content;
};

export default AccountSettings;
