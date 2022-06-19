import { PageData } from "../../types";
import ShopCardList from "src/components/commons/ShopCardList";

interface HomePageModuleProps extends PageData<any> {}

const HomePageModule: React.FunctionComponent<HomePageModuleProps> = ({
  ...props
}) => {
  return <ShopCardList {...props} />;
};

export default HomePageModule;
