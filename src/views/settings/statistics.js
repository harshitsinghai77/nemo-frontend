import { memo } from "react";

import { CustomBox, ParagraphTitle } from "../../components/Elements";
import { themePrimaryColor } from "../../themes";

const Statistics = ({ bestDay, bestSession }) => {
  return (
    <div className="my-8">
      <h1 className="text-2xl mb-2" style={{ color: themePrimaryColor }}>
        Statistics
      </h1>
      {bestDay && (
        <CustomBox>
          <h1 className="text-base text-black mb-2">Best Day</h1>
          <ParagraphTitle text={bestDay.bestDayDate} />
          <ParagraphTitle text={bestDay.bestDayDuration} />
        </CustomBox>
      )}

      {bestSession && (
        <CustomBox>
          <h1 className="text-base text-black mb-2">Best Session</h1>
          <ParagraphTitle text={bestSession.best_day_full_date} />
          <ParagraphTitle text={bestSession.best_day_duration} />
        </CustomBox>
      )}
    </div>
  );
};

export default memo(Statistics);
