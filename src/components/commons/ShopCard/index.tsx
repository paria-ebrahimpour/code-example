import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductType } from "../../../apis/services/main/_types";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { setFavoritedProducts } from "../../../store/user/slice";
import TokenServices from "src/services/token.service";
import AddBoxForm from "../AddBoxForm";
import { useSelector } from "react-redux";
import { userFavoritesSelector } from "src/store/user/selectors";

interface ShopCardProps extends ProductType {}

const ShopCard: React.FunctionComponent<ShopCardProps> = ({
  title,
  description,
  image,
  category,
  id,
  price,
}) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = TokenServices.isLoggedIn();
  const favorites = useSelector(userFavoritesSelector);
  const onAddCard = (quantity: number) => {
    dispatch(setFavoritedProducts({ productId: id, quantity }));
  };

  return (
    <Card className="w-100 mx-2 my-4">
      <div className="d-flex align-items-center justify-between mx-2 my-4">
        <Typography
          className="d-block ellipsis-text"
          sx={{
            width: 280,
            whiteSpace: "nowrap",
          }}
          gutterBottom
          variant="body1"
          component="div"
        >
          {title}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {price}
        </Typography>
      </div>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          Category: {category}
        </Typography>
        <Typography
          sx={{ height: 140 }}
          className="ellipsis-text"
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {!!isLoggedIn && <AddBoxForm onAddToFavorites={onAddCard} />}
      </CardActions>
    </Card>
  );
};

export default ShopCard;
