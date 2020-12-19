import Helmet from "react-helmet";

const TabTitle = ({ title }) => (
  <Helmet>
    <title>{title ? title : "Noisli"}</title>
  </Helmet>
);
export default TabTitle;
