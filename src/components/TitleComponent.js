import Helmet from "react-helmet";
import { APP_NAME } from "../js/utils";

const TitleComponent = ({ title }) => (
  <Helmet defer={false}>
    <meta charSet="utf-8" />
    <title>{title || `${APP_NAME} - Your digital place for focus.`}</title>
  </Helmet>
);
export default TitleComponent;
