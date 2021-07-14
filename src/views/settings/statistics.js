import { useEffect, useState } from "react";

import {
  CustomBox,
  ParagraphTitle,
  CustomSpinner,
} from "../../components/Elements";
import apiClient from "../../apiClient";
import { secToHm } from "../../js/utils";
import { themePrimaryColor } from "../../themes";

const Statistics = () => {
  const [loader, setLoader] = useState(true);
  const [stats, setStats] = useState({});
  useEffect(() => {
    async function fetchData() {
      const res = await apiClient.get_stastics();
      const { data } = res;
      if (data) {
        const [h, m] = secToHm(data.duration);
        const stats = {
          date: new Date(data.full_date).toDateString(),
          duration: `${h} hrs ${m} min`,
        };
        setStats(stats);
        setLoader(false);
      }
    }
    fetchData();
  }, []);

  const content = (
    <>
      <CustomBox>
        <h1 className="text-base text-black mb-2">Best Day</h1>
        <ParagraphTitle text={stats.date} />
        <ParagraphTitle text={stats.duration} />
      </CustomBox>
    </>
  );

  return (
    <div className="my-8">
      <h1 className="text-2xl mb-2" style={{ color: themePrimaryColor }}>
        Statistics
      </h1>
      {loader ? <CustomSpinner /> : content}
    </div>
  );
};

export default Statistics;
