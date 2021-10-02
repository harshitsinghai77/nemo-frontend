import { Helmet, HelmetProvider } from "react-helmet-async";
import { APP_NAME } from "../js/utils";

const TitleComponent = ({ title }) => (
  <HelmetProvider>
    <Helmet defer={false}>
      <meta charSet="utf-8" />
      <title>{title || `${APP_NAME} - Your digital place for focus.`}</title>
    </Helmet>
  </HelmetProvider>
);
export default TitleComponent;
