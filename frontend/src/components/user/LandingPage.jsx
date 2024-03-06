import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { saveUserDetailsSuccess } from "../../redux/user/userSlice";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const LandingPage = () => {
  const { userId, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`${BASE_URL}/user/${userId}`, { withCredentials: true })
          .then((res) => {
            if (res.status == 200 && res.data?.user) {
              dispatch(saveUserDetailsSuccess(res.data?.user));
            }
          });
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return currentUser ? (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: { sm: 300, md: 400, lg: 500 },
          bgcolor: "#808080",
          color: "#fff",
        }}
      >
        <CardContent sx={{ gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography fontSize={18}>Username:</Typography>
            <Typography>{currentUser?.username}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography fontSize={18}>Email:</Typography>
            <Typography>{currentUser?.email}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  ) : null;
};

export default LandingPage;
