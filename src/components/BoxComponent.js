import Box from "@mui/material/Box";
import MediaCard from "./Card";
import Grid from "@mui/material/Grid";

const BoxComponent = ({
  data,
  title,
  isFromCity,
  handleButtonClick,
  isFromHotel,
  isFromCategory,
  isFromMenu,
  isFromLogin,
  isFromPopup,
}) => {
  const getName = (item) => {
    if (isFromCity) {
      return item.cityName;
    } else if (isFromHotel) {
      return item.hotelName;
    } else if (isFromCategory) {
      return item.categoryName;
    } else if (isFromMenu) {
      return item.name;
    }
  };

  const getUrl = (item) => {
    if (isFromCity) {
      return item.cityImg;
    } else if (isFromHotel) {
      return item.hotelImg;
    } else if (isFromCategory) {
      return item.categoryImg;
    } else if (isFromMenu) {
      return item.img;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        "& > *": {
          m: 1,
        },
      }}
      className="home"
    >
      <h2 style={{ textAlign: "left", backgroundColor: "transparent" }}>
        {title}
      </h2>
      <Grid container spacing={2} style={{ marginLeft: "20px" }}>
        {data.map((item, index) => (
          <Grid item xs={isFromPopup ? 12 : isFromMenu ? 4 : 2} key={index}>
            <MediaCard
              name={getName(item)}
              imgUrl={getUrl(item)}
              isFromCity={isFromCity}
              isFromHotel={isFromHotel}
              isFromCategory={isFromCategory}
              isFromMenu={isFromMenu}
              handleButtonClick={handleButtonClick}
              rating={isFromMenu ? item.rate : item.hotelRating}
              description={item.dsc}
              price={item.price}
              item={item}
              isFromLogin={isFromLogin}
              isFromPopup={isFromPopup}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default BoxComponent;
