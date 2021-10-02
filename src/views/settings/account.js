import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, TextInput, Button } from "grommet";

import apiClient from "../../apiClient";
import { store } from "../../store/store";
import {
  SET_USERNAME,
  SET_EMAIL,
  SET_FAMILY_NAME,
  SET_GIVEN_NAME,
  SET_USER_ACCOUNT,
  SET_USER_SETTING_LOADED_FROM_BACKEND,
} from "../../store/types";
import {
  ParagraphTitle,
  BorderLine,
  CustomBox,
  CustomSpinner,
} from "../../components/Elements";
import { removeToken } from "../../tokenStorage";
import { APP_NAME } from "../../js/utils";

const AccountSettings = () => {
  const history = useHistory();
  const [loader, setLoader] = useState(true);
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const {
    username,
    email,
    given_name,
    family_name,
    user_account_loaded_from_backend,
  } = globalState.state.userAccount;

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiClient.get_account();
      const { data } = res;
      dispatch({
        type: SET_USER_ACCOUNT,
        value: data,
      });
      dispatch({
        type: SET_USER_SETTING_LOADED_FROM_BACKEND,
        value: !user_account_loaded_from_backend,
      });
      setLoader(false);
    };

    if (user_account_loaded_from_backend) {
      fetchData();
    } else {
      setLoader(false);
    }
  }, [user_account_loaded_from_backend, dispatch]);

  const onSubmit = async () => {
    const account = {
      given_name: given_name,
      family_name: family_name,
      username: username,
      email: email,
    };
    const resp = await apiClient.update_account(account);
    const { data } = resp;
    dispatch({
      type: SET_USER_ACCOUNT,
      value: data,
    });
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

  const onLogout = () => {
    removeToken();
    history.push("/");
  };

  const deleteUser = async () => {
    const res = await apiClient.delete_user();
    const { success } = res.data;
    if (success) {
      removeToken();
      history.push("/");
    }
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
            disabled
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

      <div>
        <Button
          margin={{ right: "small" }}
          secondary
          label="Update"
          onClick={onSubmit}
        />
        <Button secondary label="Logout" onClick={onLogout} />
      </div>

      <BorderLine />

      <Box margin={{ vertical: "small" }}>
        <ParagraphTitle
          text={`Want to permanently delete your ${APP_NAME} account?`}
        />
      </Box>
      <div className="mb-20">
        <Button label="Delete Account" color="red" onClick={deleteUser} />
      </div>
    </div>
  );

  return loader ? <CustomSpinner /> : content;
};

export default AccountSettings;
