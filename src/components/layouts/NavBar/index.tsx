import { AppBar, Button, Container, IconButton, Toolbar } from "@mui/material";
import {
  userFavoritesSelector,
  userTokenSelector,
} from "../../../store/user/selectors";
import { useSelector } from "react-redux";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { removeUserAction } from "../../../store/user/actions";
import { HomeOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useRequest from "src/hooks/useRequest";
import { UserApi } from "src/apis";
import moment from "moment";

const MainNavbar = () => {
  const userToken = useSelector(userTokenSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favoritedCards = useSelector(userFavoritesSelector);
  const { request } = useRequest({ api: UserApi.addToFavorites });
  const CurrentDate = moment().format();

  const onLogout = async () => {
    await dispatch(removeUserAction());
    navigate("/");
  };

  const onSubmitFavoritesHandler = async () => {
    await request({ userId: 1, products: favoritedCards, date: CurrentDate });
    navigate("my-cart");
  };
  return (
    <AppBar color="default" position="fixed" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          className="d-flex justify-between align-items-center"
        >
          <div>
            <IconButton href="/">
              <HomeOutlined />
            </IconButton>
            {favoritedCards.length > 0 && (
              <Button variant="outlined" onClick={onSubmitFavoritesHandler}>
                Submit Adding to Favorites
              </Button>
            )}
          </div>
          <div>
            {userToken ? (
              <>
                <Button href="my-cart">Dashboard</Button>
                <Button variant="text" onClick={onLogout}>
                  LogOut
                </Button>
              </>
            ) : (
              <Button href="account/login">Login</Button>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainNavbar;
