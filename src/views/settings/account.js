import { useEffect, useContext, useState } from "react";
import { Box, TextInput, Button, Notification } from "grommet";

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
import { APP_NAME, onLogout } from "../../js/utils";

const AccountSettings = () => {
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
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
    setVisible(true);
    dispatch({
      type: SET_USER_ACCOUNT,
      value: data,
    });
  };

  const handleInputChange = (type, value) => {
    dispatch({ type, value });
  };

  const deleteUser = async () => {
    const res = await apiClient.delete_user();
    const { success } = res.data;
    if (success) {
      onLogout();
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
            onChange={(event) =>
              handleInputChange(SET_USERNAME, event.target.value)
            }
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
            onChange={(event) =>
              handleInputChange(SET_EMAIL, event.target.value)
            }
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
            onChange={(event) =>
              handleInputChange(SET_GIVEN_NAME, event.target.value)
            }
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
            onChange={(event) =>
              handleInputChange(SET_FAMILY_NAME, event.target.value)
            }
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

      {visible && (
        <Notification
          toast
          status="normal"
          title="Your account information has been updated!"
          // message="This is an example of a notification message"
          onClose={() => setVisible((prevVisible) => !prevVisible)}
          background="#f6f8f9"
          time={3000}
        />
      )}
    </div>
  );

  return loader ? <CustomSpinner /> : content;
};

export default AccountSettings;
