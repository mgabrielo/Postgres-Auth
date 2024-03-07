import React, { useEffect, useState } from "react";
import { Button, Grid, InputLabel, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [checkError, setCheckError] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (data, e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      await axios
        .post(`${BASE_URL}/auth/login`, data, { withCredentials: true })
        .then((res) => {
          if (res.status == 200 && res.data) {
            dispatch(signInSuccess(res.data?.userId));
            navigate(`/landing-page`);
            toast.success(res.data?.message);
            reset({});
          }
        })
        .catch((err) => {
          dispatch(
            signInFailure(
              err?.response?.data?.msg
                ? err?.response?.data?.msg
                : "Error in Signing In"
            )
          );
          setCheckError(true);
        });
    } catch (error) {
      dispatch(signInFailure("Could Not Complete Sign In"));
      console.log(error);
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
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Login
            </Typography>
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
              size="small"
              aria-label="email"
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
              width: "100%",
              justifyContent: "center",
              px: 3,
              py: 1,
            }}
          >
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit((data, e) => handleLogin(data, e))}
              disabled={isSubmitting}
              sx={{ textTransform: "capitalize", width: "90%" }}
            >
              Login
            </Button>
          </Box>
          {error && !loading && checkError ? (
            <Box sx={{ maxWidth: 250 }}>
              <Typography
                flexWrap={"wrap"}
                sx={{ m: 0, color: "red", fontSize: 17, fontWeight: 600 }}
              >
                {error}
              </Typography>
            </Box>
          ) : null}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              fontSize: 15,
            }}
          >
            <Typography component={"span"}>
              Don't Have An Account...?
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography
                component={Link}
                to={"/register"}
                sx={{
                  textDecoration: "none",
                  color: "#808080",
                  ":hover": { textDecoration: "underline" },
                }}
              >
                Register
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
