import { memo } from "react";
import { APP_NAME } from "../js/utils";

const Introduction = () => (
  <div className="flex-item text-center	text-lg mb-10">
    <h1 className="text-2">{APP_NAME}</h1>
    <p>
      Your digital place for <strong>focus</strong>.
    </p>
    <p>
      <strong>{APP_NAME}</strong> helps you boost your motivation and help you
      think more creatively.
    </p>
  </div>
);

export default memo(Introduction);
