import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Box from "@mui/material/Box";
import SpeedDial from "./SpeedDial";

export default function MediaCard({
  name,
  isHome,
  imgUrl,
  description,
  isFromCity,
  handleButtonClick,
  isFromHotel,
  rating,
  isFromCategory,
  isFromMenu,
  price,
  item,
  isFromLogin,
  isFromPopup,
}) {
  const getCardheight = () => {
    if (isFromCity) {
      return 200;
    } else if (isFromHotel) {
      return 300;
    } else if (isFromMenu) {
      return 350;
    } else {
      return 200;
    }
  };

  return (
    <>
      {isFromMenu ? (
        <Card
          style={{ position: "relative" }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: isFromPopup ? 200 : 215,
            minWidth: 440,
            maxWidth: isFromPopup ? 200 : 250,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{}}>
              <Typography component="div" variant="h5">
                {name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                style={{ fontWeight: 600 }}
              >
                ₹{price}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                style={{ fontSize: "12px" }}
              >
                {description}
              </Typography>
            </CardContent>
            {isFromLogin ? (
              <SpeedDial handleButtonClick={handleButtonClick} item={item} />
            ) : (
              !isFromPopup && (
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <CardActions
                    style={{ position: "absolute", bottom: "0", left: "0" }}
                  >
                    <Button
                      style={{ backgroundColor: "#ff9900" }}
                      endIcon={<LocalDiningIcon />}
                      onClick={() =>
                        handleButtonClick(
                          name,
                          isFromCity,
                          isFromHotel,
                          isFromCategory,
                          isFromMenu,
                          item
                        )
                      }
                      size="small"
                      variant="contained"
                    >
                      Add Item
                    </Button>
                  </CardActions>
                </Box>
              )
            )}
          </Box>
          <CardMedia
            className="card--image"
            component="img"
            sx={{ width: 171 }}
            image={imgUrl}
            alt={name}
          />
        </Card>
      ) : (
        <Card
          sx={{
            maxWidth: 200,
            minWidth: 200,
            maxHeight: isHome ? 200 : 300,
            minHeight: getCardheight(),
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CardMedia
            sx={{ height: isHome ? 120 : 140, width: isHome ? 120 : 200 }}
            image={imgUrl}
            title={name}
            className="card--image"
          />
          <CardContent>
            <Typography
              style={{ textAlign: "center" }}
              gutterBottom
              variant={isFromHotel ? "h6" : "h5"}
              component="div"
            >
              {name}
            </Typography>
            {isFromHotel && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></div>
            )}
          </CardContent>
          {(isFromCity || isFromHotel || isFromCategory) && (
            <CardActions
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() =>
                  handleButtonClick(
                    name,
                    isFromCity,
                    isFromHotel,
                    isFromCategory,
                    isFromMenu,
                    item
                  )
                }
                size="small"
              >
                {isFromCity || isFromHotel || isFromCategory ? "Select" : ""}
              </Button>
            </CardActions>
          )}
        </Card>
      )}
    </>
  );
}
