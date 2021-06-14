import { memo } from "react";
import { APP_NAME } from "../js/utils";

const Introduction = () => (
  <div className="flex-item welcome-text">
    <p>
      {APP_NAME} is your digital place for <strong>focus</strong>.
    </p>
    <p>
      <strong>{APP_NAME}</strong> helps you boost your motivation and help you
      think more creatively.
    </p>
  </div>
);

export default memo(Introduction);
