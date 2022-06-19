import ShopCard from "../ShopCard";
import { PageData } from "../../../types";
import { Grid } from "@mui/material";

interface ShopCardListProps extends PageData<any> {}

const ShopCardList: React.FunctionComponent<ShopCardListProps> = ({ data }) => {
  return (
    <div className="mt-20">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
      >
        {data?.map((el: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={el.id}>
            <ShopCard {...el} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShopCardList;
