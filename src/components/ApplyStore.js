import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HotelForm from "./HotelForm";
import CategoryForm from "./CategoryForm";
import Alert from "@mui/material/Alert";

const steps = ["Hotel Form", "Category Form"];

export default function ApplyStore() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [hotelInfo, setHotelInfo] = React.useState({
    hotelCity: null,
    hotelName: "",
    hotelUsername: "",
    hotelPassword: "",
    hotelAddress: "",
    hotelState: "",
    hotelPincode: "",
    hotelCountry: "",
    hotelImg: "",
  });
  const [categoryInfo, setCategoryInfo] = React.useState({
    categoryName: null,
    menuName: "",
    menuDescription: "",
    price: 0,
    menuType: "non-veg",
    menuImg: "",
    key: "",
  });
  const [failedLogin, setFailedLogin] = React.useState(false);

  const handleNext = (isHotelAdd) => {
    if (isHotelAdd && categoryInfo.key !== "abcd") {
      setFailedLogin(true);
      return;
    } else {
      setActiveStep(activeStep + 1);
    }
    if (isHotelAdd) {
      let hotelData = {
        hotelName: hotelInfo.hotelName,
        hotelAddress: hotelInfo.hotelAddress,
        userName: hotelInfo.hotelUsername,
        password: hotelInfo.hotelPassword,
        hotelState: "Maharashtra",
        hotelPincode: "400001",
        hotelImg: hotelInfo.hotelImg,
        hotelReviews: ["Good hotel", "Nice hotel"],
        hotelRating: 4,
        hotelCity: hotelInfo.hotelCity,
      };
      let localHotelData = JSON.parse(localStorage.getItem("hotelData"));
      if (localHotelData) {
        localStorage.setItem(
          "hotelData",
          JSON.stringify(localHotelData.concat([hotelData]))
        );
      } else {
        localStorage.setItem("hotelData", JSON.stringify([hotelData]));
      }

      let categoryData = {
        id: generateRandomString(10),
        img: categoryInfo.menuImg,
        dsc: categoryInfo.menuDescription,
        price: categoryInfo.price,
        name: categoryInfo.menuName,
        rate: 5,
        country: "Kimmswick, MO",
        hotelUserName: [hotelInfo.hotelUsername],
        categoryName: categoryInfo.categoryName,
      };

      let saveData = JSON.parse(localStorage.getItem("saveData"));
      if (!saveData) {
        saveData = [categoryData];
      } else {
        saveData = {
          ...saveData,
          addedItems: saveData.addedItems.concat([categoryData]),
        };
      }

      localStorage.setItem("saveDataFromApply", JSON.stringify(saveData));
    }
  };

  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }

    return randomString;
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <HotelForm setHotelInfo={setHotelInfo} hotelInfo={hotelInfo} />;
      case 1:
        return (
          <CategoryForm
            categoryInfo={categoryInfo}
            setCategoryInfo={setCategoryInfo}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      {failedLogin && (
        <Alert severity="error" onClose={() => setFailedLogin(false)}>
          You've entered wrong Authenticate Key.
        </Alert>
      )}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 2, md: 1 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Hotel Apply
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for adding Hotel.
              </Typography>
              <Typography variant="subtitle1">
                Your hotel has added successfully. We have emailed your hotel
                confirmation.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={() => handleNext(activeStep === steps.length - 1)}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Add Hotel" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
