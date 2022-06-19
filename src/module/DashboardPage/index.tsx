import { Button, Grid, ListItem, Typography } from "@mui/material";
import { UserApi } from "src/apis";
import { FavoritedProduct, UserCartsType } from "src/apis/services/user/_types";
import useRequest from "src/hooks/useRequest";
import { PageData } from "src/types";

interface DashboardPageModuleProps extends PageData<any> {}

const DashboardPageModule: React.FunctionComponent<
  DashboardPageModuleProps
> = ({ data }) => {
  const { request } = useRequest({ api: UserApi.removeUserCart });
  const onRemoveCardHandler = (el: number) => {
    request(el);
  };

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date: Date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  if (!data) return <div className="mt-20">no cards found</div>;
  return (
    <div className="mt-20">
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {data.map((el: UserCartsType, idx: number) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={idx}
            className="w-100 mx-2 my-4"
            sx={{ border: "1px solid gray", height: 370, position: "relative" }}
          >
            <div key={idx} className="d-flex flex-column align-items-center">
              <Typography className="text-center" color="Highlight">
                Date: {formatDate(new Date(el.date))}
              </Typography>
              {el.products &&
                el.products.map((product: FavoritedProduct) => (
                  <ListItem className="d-flex justify-between my-2">
                    <Typography>{`Product ID: ${product.productId}`}</Typography>
                    <Typography>{`Quantity: ${product.quantity}`}</Typography>
                  </ListItem>
                ))}
              <Button
                variant="outlined"
                color="error"
                sx={{ position: "absolute", bottom: 12 }}
                onClick={() => onRemoveCardHandler(el.id)}
              >
                Remove from Favorites
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DashboardPageModule;
