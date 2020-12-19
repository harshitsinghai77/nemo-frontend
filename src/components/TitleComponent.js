import Helmet from "react-helmet";

const TitleComponent = ({ title }) => (
  <Helmet>
    <title>{title ? title : "Noisli"}</title>
  </Helmet>
);
export default TitleComponent;
