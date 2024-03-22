import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import categories from "../assets/json/category.json";
import Autocomplete from "@mui/material/Autocomplete";
import ButtonClick from "@mui/material/Button";

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

export default function CategoryForm({
  categoryInfo,
  setCategoryInfo,
  isFromLogin,
  type,
  handleButtonClick,
}) {
  const [categoryData, setCategoryDate] = React.useState([]);

  React.useEffect(() => {
    setCategoryDate(categories.map((item) => item.categoryName));
  }, [categories]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // The result contains the data URL
        const imageUrl = reader.result;
        setCategoryInfo({ ...categoryInfo, menuImg: imageUrl });
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Category Form
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categoryData}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Category"
                variant="standard"
              />
            )}
            value={categoryInfo.categoryName}
            onChange={(event, newValue) => {
              setCategoryInfo({ ...categoryInfo, categoryName: newValue });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="menuName"
            label="Menu Name"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={categoryInfo.menuName}
            onChange={(e) =>
              setCategoryInfo({ ...categoryInfo, menuName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="menuDescription"
            label="Menu Desciption"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={categoryInfo.menuDescription}
            onChange={(e) =>
              setCategoryInfo({
                ...categoryInfo,
                menuDescription: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
            <Input
              id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start">₹</InputAdornment>
              }
              value={categoryInfo.price}
              onChange={(e) =>
                setCategoryInfo({ ...categoryInfo, price: e.target.value })
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl style={{ paddingTop: "10px" }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={categoryInfo.menuType}
              onChange={(e) =>
                setCategoryInfo({ ...categoryInfo, menuType: e.target.value })
              }
            >
              <FormControlLabel value="veg" control={<Radio />} label="Veg" />
              <FormControlLabel
                value="non-veg"
                control={<Radio />}
                label="Non Veg"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {!isFromLogin && (
          <Grid item xs={12}>
            <TextField
              required
              id="key"
              label="Authenticate Key"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              value={categoryInfo?.key}
              onChange={(e) =>
                setCategoryInfo({
                  ...categoryInfo,
                  key: e.target.value,
                })
              }
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            style={{ width: "100%", marginTop: "10px" }}
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
            Upload a Menu Image
            <VisuallyHiddenInput
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => handleImageUpload(e)}
            />
          </Button>
        </Grid>
        {categoryInfo.menuImg.length > 0 && (
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
                src={categoryInfo.menuImg}
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
                onClick={() =>
                  setCategoryInfo({ ...categoryInfo, menuImg: "" })
                }
              >
                ❌
              </button>
            </Grid>
          </>
        )}
      </Grid>
      {isFromLogin && ( //from login page edit or add menu
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px 0 0 0",
          }}
        >
          <ButtonClick
            variant="contained"
            style={{ width: "100%", backgroundColor: "#ff9900" }}
            onClick={() =>
              handleButtonClick(
                type === "Add Changes" ? "Add Menu" : "Edit Menu"
              )
            }
          >
            {type}
          </ButtonClick>
        </Grid>
      )}
    </React.Fragment>
  );
}
