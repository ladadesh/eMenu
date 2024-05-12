import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import Autocomplete from "@mui/material/Autocomplete";
import data from "../assets/json/hotel.json";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function HotelForm({ hotelInfo, setHotelInfo }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [cityData, setCityData] = React.useState([]);

  React.useEffect(() => {
    setCityData(data.map((item) => item.cityName));
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // The result contains the data URL
        const imageUrl = reader.result;
        setHotelInfo({ ...hotelInfo, hotelImg: imageUrl });
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cityData}
            renderInput={(params) => (
              <TextField {...params} label="Select City" variant="standard" />
            )}
            value={hotelInfo.hotelCity}
            onChange={(event, newValue) => {
              setHotelInfo({ ...hotelInfo, hotelCity: newValue });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="hotelName"
            name="hotelName"
            label="Hotel Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={hotelInfo.hotelName}
            onChange={(e) =>
              setHotelInfo({ ...hotelInfo, hotelName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="hotelUserName"
            name="hotelUserName"
            label="Hotel User Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={hotelInfo.hotelUsername}
            onChange={(e) =>
              setHotelInfo({ ...hotelInfo, hotelUsername: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={hotelInfo.hotelPassword}
              onChange={(e) =>
                setHotelInfo({ ...hotelInfo, hotelPassword: e.target.value })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={hotelInfo.hotelAddress}
            onChange={(e) =>
              setHotelInfo({ ...hotelInfo, hotelAddress: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            style={{ width: "100%" }}
            startDecorator={
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </SvgIcon>
            }
          >
            Upload a Hotel Image
            <VisuallyHiddenInput
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => handleImageUpload(e)}
            />
          </Button>
        </Grid>
        {hotelInfo.hotelImg.length > 0 && (
          <>
            <Grid
              item
              xs={10}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={hotelInfo.hotelImg}
                alt="hotel img"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "contain",
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => setHotelInfo({ ...hotelInfo, hotelImg: "" })}
              >
                ❌
              </button>
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
}
