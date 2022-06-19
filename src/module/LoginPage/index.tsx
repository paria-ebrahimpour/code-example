import { TextField, Button, Typography, Box } from "@mui/material";
import { UserAuthenticatePayloadType } from "../../apis";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUserTokenAction } from "../../store/user/actions";
import useAppDispatch from "../../hooks/useAppDispatch";
import TokenServices from "../../services/token.service";

interface IFormInputs {
  username: string;
  password: string;
}

const LoginPageModule = () => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: UserAuthenticatePayloadType) => {
    await dispatch(
      getUserTokenAction({
        username: data.username,
        password: data.password,
      })
    );
    if (TokenServices.isLoggedIn()) {
      navigate("/");
    }
  };

  return (
    <>
      <Box sx={{ minHeight: 100 }} />
      <Box
        sx={{
          width: 350,
          height: 400,
          margin: "auto",
          border: "3px solid gray",
        }}
        className="d-flex flex-column px-20 radius-lg"
      >
        <Typography className="text-center py-10" variant="h5">
          Login / Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue="johnd2"
            rules={{ required: true, minLength: 3 }}
            render={({ field }) => (
              <TextField
                label="username"
                fullWidth
                error={!!errors.username}
                helperText={errors.username && "invalid input"}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue="m38rmF$"
            rules={{
              required: true,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/i,
            }}
            render={({ field }) => (
              <TextField
                label="password"
                margin="normal"
                fullWidth
                error={!!errors.password}
                helperText={errors.password && "invalid password"}
                {...field}
              />
            )}
          />
          <div className="mt-10">
            <Button fullWidth type="submit" variant="contained">
              submit
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default LoginPageModule;
