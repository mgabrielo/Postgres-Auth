import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  saveUserDetailsFailure,
  saveUserDetailsStart,
  saveUserDetailsSuccess,
} from "../../redux/user/userSlice";

const LandingPage = () => {
  const { userId, error, loading, currentUser } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(saveUserDetailsStart());
        await axios
          .get(`${BASE_URL}/user/${userId}`, { withCredentials: true })
          .then((res) => {
            if (res.status == 200 && res.data?.user) {
              dispatch(saveUserDetailsSuccess(res.data?.user));
            }
          })
          .catch((err) => {
            saveUserDetailsFailure(err?.message);
          });
      } catch (error) {
        saveUserDetailsFailure(error?.message);
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
  ) : !loading && (error || !currentUser) ? (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Error Getting User</Typography>
    </Box>
  ) : null;
};

export default LandingPage;
