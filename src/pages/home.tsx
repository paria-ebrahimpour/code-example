import HomePageModule from "../module/HomePage";
import { MainApi } from "../apis/services/main";
import useRequest from "../hooks/useRequest";

const HomePage = () => {
  const pageData = useRequest({
    api: MainApi.getProducts,
    fireOnLoad: true,
  });
  return <HomePageModule {...pageData} />;
};

export default HomePage;
