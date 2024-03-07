import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../../redux/user/userSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkError, setCheckError] = useState(false);
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const password = watch("password", "");

  const handleRegister = async (data, e) => {
    e.preventDefault();
    try {
      dispatch(signUpStart());
      await axios
        .post(`${BASE_URL}/auth/register`, data)
        .then((res) => {
          dispatch(signUpSuccess(res.data.message));
          toast.success(message);
          navigate("/login");
        })
        .catch((err) => {
          dispatch(signUpFailure("Error in Registration"));
          setCheckError(true);
        });
    } catch (error) {
      console.log(error);
      dispatch(signUpFailure("Could Not Registration"));
    }
  };

  useEffect(() => {
    if (checkError) {
      setTimeout(() => {
        setCheckError(false);
      }, 3000);
    }
  }, [checkError]);

  return (
    <Grid
      container
      gap={2}
      columns={2}
      sx={{
        display: "flex",
        height: "100vh",
        p: 3,
        flexDirection: { xs: "row", sm: "row", md: "column", lg: "column" },
      }}
    >
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Welcome to Post Auth
          </Typography>
          <Typography variant="body">Share the Auth Experience</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            flexDirection: "column",
            px: 5,
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Register
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <InputLabel aria-label="username"></InputLabel>
            <TextField
              variant="outlined"
              type="text"
              aria-label="username"
              label="Username"
              size="small"
              placeholder="Enter Username"
              helperText={
                Boolean(errors.username) ? "Username is Required" : ""
              }
              error={Boolean(errors.username)}
              {...register("username", { required: true })}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <InputLabel aria-label="email"></InputLabel>
            <TextField
              variant="outlined"
              type="email"
              fullWidth
              aria-label="email"
              size="small"
              label="Email"
              placeholder="Enter Email"
              helperText={
                Boolean(errors.email) ? "Email Field is Required" : ""
              }
              error={Boolean(errors.email)}
              {...register("email", {
                required: "true",
                validate: (val) =>
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val),
              })}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <InputLabel aria-label="pasword"></InputLabel>
            <TextField
              variant="outlined"
              type="password"
              aria-label="password"
              label="Password"
              placeholder="Enter Password"
              size="small"
              fullWidth
              helperText={
                Boolean(errors.password) ? "Password Field is Required" : ""
              }
              error={Boolean(errors.password)}
              {...register("password", { required: true, minLength: 6 })}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <InputLabel aria-label="Confirm Password"></InputLabel>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  type="password"
                  aria-label="Confirm Password"
                  label="Confirm Password"
                  placeholder="Confirm Your Password"
                  size="small"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  {...field}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              py: 1,
            }}
          >
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleSubmit((data, e) => handleRegister(data, e))}
              disabled={isSubmitting}
              sx={{ textTransform: "capitalize", width: "90%" }}
            >
              Register
            </Button>
          </Box>
          {error && !loading && checkError ? (
            <Typography
              sx={{ my: 2, color: "red", fontSize: 17, fontWeight: 600 }}
            >
              {error}
            </Typography>
          ) : null}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              fontSize: 15,
            }}
          >
            <Typography component={"span"}>
              Already Have An Account...?
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography
                component={Link}
                to={"/login"}
                sx={{
                  textDecoration: "none",
                  color: "#808080",
                  ":hover": { textDecoration: "underline" },
                }}
              >
                Login
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
