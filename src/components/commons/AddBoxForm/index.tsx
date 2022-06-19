import { Add, Remove } from "@mui/icons-material";
import { Grid, Button, TextField, IconButton } from "@mui/material";
import React, { useState } from "react";

interface AddBoxFormProps {
  onAddToFavorites: (el: number) => void;
}

const AddBoxForm: React.FunctionComponent<AddBoxFormProps> = ({
  onAddToFavorites,
}) => {
  const [value, setValue] = useState(0);

  const minusHandler = () => {
    if (value <= 0) {
      setValue(0);
    } else {
      setValue(value - 1);
    }
  };
  const plusHandler = () => {
    setValue(value + 1);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    onAddToFavorites(value);
    console.log(value);
  };

  return (
    <Grid
      container
      spacing={2}
      className="d-flex align-items-center justify-around"
    >
      <Grid item>
        <div className="d-flex">
          <IconButton onClick={plusHandler}>
            <Add />
          </IconButton>
          <TextField sx={{ width: 100 }} type="number" value={value} />
          <IconButton onClick={minusHandler}>
            <Remove />
          </IconButton>
        </div>
      </Grid>
      <Grid item>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          onClick={submitHandler}
        >
          Add to Favorites
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddBoxForm;
