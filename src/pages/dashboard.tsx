import { UserApi } from "../apis";
import useRequest from "../hooks/useRequest";
import DashboardPageModule from "../module/DashboardPage";

const MyCartPage = () => {
  const userId = "1";
  const pageData = useRequest({
    api: UserApi.getUserCarts,
    initialArgs: userId,
    fireOnLoad: true,
  });
  return <DashboardPageModule {...pageData} />;
};

export default MyCartPage;
