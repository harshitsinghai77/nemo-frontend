import { memo } from "react";

const Introduction = () => (
  <div className="flex-item welcome-text">
    <p>
      Noisli is your digital place for <strong>focus</strong>.
    </p>
    <p>
      Noisli helps you boost your motivation and help you think more creatively.
    </p>
  </div>
);

export default memo(Introduction);
