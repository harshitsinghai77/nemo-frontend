import Helmet from "react-helmet";

const TitleComponent = ({ title }) => (
  <Helmet defer={false}>
    <meta charSet="utf-8" />
    <title>{title || "Noisly - Your digital place for focus."}</title>
  </Helmet>
);
export default TitleComponent;
