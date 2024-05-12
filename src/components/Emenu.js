import { useState, useEffect } from "react";
import data from "../assets/json/hotel.json";
import categoryData from "../assets/json/category.json";
import BoxComponent from "./BoxComponent";
import Chip from "@mui/material/Chip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CategoryForm from "./CategoryForm";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const Emenu = ({ isFromLogin, hotelUsernameFromLogin }) => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  const [showHotel, setShowHotel] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCatagory, setSelectedCategory] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [categoryHotelData, setCategoryHotelData] = useState([]);
  const [isAddMenu, setIsAddMenu] = useState(false);
  const [isEditMenu, setIsEditMenu] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({
    categoryName: "",
    menuName: "",
    menuDescription: "",
    price: 0,
    menuType: "veg",
    menuImg: "",
  });
  const [hotelReviews, setHotelReviews] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);

  useEffect(() => {
    if (isFromLogin) {
      setShowCategory(true);
      getCategoryItems(hotelUsernameFromLogin);
    }
  }, [isFromLogin, hotelUsernameFromLogin]);

  useEffect(() => {
    if (showHotel) {
      let hotelData = JSON.parse(localStorage.getItem("hotelData"));
      if (hotelData) {
        hotelData = [...hotelData].filter(
          (item) => item.hotelCity === selectedCity.cityName
        );
        if (hotelData.length > 0) {
          let currHotelList = selectedCity.hotelList;
          let addedHotel = [];
          hotelData.map((item) => {
            if (
              !currHotelList.find((hotel) => hotel.hotelName === item.hotelName)
            ) {
              addedHotel.push(item);
            }
          });

          setSelectedCity({
            ...selectedCity,
            hotelList: selectedCity.hotelList.concat(addedHotel),
          });
        }
      }
    }
  }, [showHotel]);

  const handleButtonClick = (
    name,
    isFromCity,
    isFromHotel,
    isFromCategory,
    isFromMenu,
    item
  ) => {
    if (isFromCity) {
      let selectedCityOnClick = [...data].find(
        (item) => item.cityName === name
      );
      setSelectedCity(selectedCityOnClick);
      setShowHotel(true);
    } else if (isFromHotel) {
      setShowCategory(true);
      setShowHotel(false);
      setHotelReviews({
        review: "",
        ratings: item.hotelRating,
        reviews: item.hotelReviews,
      });
      getCategoryItems(item.hotelUserName ? item.hotelUserName : item.userName);
    } else if (isFromCategory) {
      let finalCategoryHotelData = [];
      if (isFromLogin) {
        finalCategoryHotelData = getCategoryItems(hotelUsernameFromLogin, true);
      } else {
        finalCategoryHotelData = categoryHotelData;
      }

      let selectedCatagoryOnClick = [...finalCategoryHotelData].find(
        (item) => item.categoryName === name
      );
      setSelectedCategory(selectedCatagoryOnClick);
      setShowMenu(true);
      setShowCategory(false);
    } else if (isFromMenu) {
      setSelectedMenu([...selectedMenu, item]);
    } else if (name === "Delete") {
      let finalMenuList = [...selectedCatagory.menuList].filter(
        (menu) => menu.id !== item.id
      );
      setSelectedCategory({ ...selectedCatagory, menuList: finalMenuList });
      let deletedItem = {
        ...item,
      };
      deletedItem.hotelUserName = hotelUsernameFromLogin;
      deletedItem.img = "";
      // save logic
      let saveData = JSON.parse(localStorage.getItem("saveData"));
      if (!saveData) {
        saveData = {
          deletedItems: [deletedItem],
          editedItems: [],
          addedItems: [],
        };
      } else {
        saveData = {
          ...saveData,
          deletedItems: saveData.deletedItems.concat([deletedItem]),
        };
      }
      localStorage.setItem("saveData", JSON.stringify(saveData));
    } else if (name === "Add") {
      setIsAddMenu(true);
      setShowCategory(false);
    } else if (name === "Edit") {
      setIsEditMenu(true);
      setIsAddMenu(false);
      setShowMenu(false);
      setCategoryInfo({
        categoryName: item.categoryName,
        menuName: item.name,
        menuDescription: item.dsc,
        price: item.price,
        menuType: "veg",
        menuImg: item.img,
        id: item.id,
      });
    } else if (name === "Edit Menu") {
      let saveData = JSON.parse(localStorage.getItem("saveData"));
      let categoryData = {
        id: categoryInfo.id,
        dsc: categoryInfo.menuDescription,
        price: categoryInfo.price,
        name: categoryInfo.menuName,
        rate: 5,
        country: "Kimmswick, MO",
        hotelUserName: hotelUsernameFromLogin,
        categoryName: categoryInfo.categoryName,
      };
      if (!saveData) {
        saveData = {
          deletedItems: [],
          editedItems: [categoryData],
          addedItems: [],
        };
      } else {
        saveData = {
          ...saveData,
          editedItems: saveData.editedItems.concat([categoryData]),
        };
      }
      localStorage.setItem("saveData", JSON.stringify(saveData));
    } else if (name === "Add Menu") {
      let saveData = JSON.parse(localStorage.getItem("saveData"));
      let categoryData = {
        id: generateRandomString(10),
        img: categoryInfo.menuImg,
        dsc: categoryInfo.menuDescription,
        price: categoryInfo.price,
        name: categoryInfo.menuName,
        rate: 5,
        country: "Kimmswick, MO",
        hotelUserName: hotelUsernameFromLogin,
        categoryName: categoryInfo.categoryName,
      };
      if (!saveData) {
        saveData = {
          deletedItems: [],
          editedItems: [],
          addedItems: [categoryData],
        };
      } else {
        saveData = {
          ...saveData,
          addedItems: saveData.addedItems.concat([categoryData]),
        };
        saveData.addedItems = removeDuplicatesWithName(
          saveData.addedItems,
          "name"
        );
      }
      setCategoryInfo({
        categoryName: "",
        menuName: "",
        menuDescription: "",
        price: 0,
        menuType: "veg",
        menuImg: "",
      });
      localStorage.setItem("saveData", JSON.stringify(saveData));
    }
  };

  function removeDuplicatesWithName(array, propertyName) {
    let seen = {};
    return array.filter((item) => {
      let property = item[propertyName];
      return seen.hasOwnProperty(property) ? false : (seen[property] = true);
    });
  }

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

  const getCategoryItems = (userName, fromhotelClick) => {
    let finalCategoryData = [];
    let saveDataFromLocal = JSON.parse(localStorage.getItem("saveData"));

    categoryData.forEach((category) => {
      if (category.hotelUserName.includes(userName)) {
        let finalMenuList = [];
        category.menuList.forEach((menu) => {
          if (menu.hotelUserName.includes(userName)) {
            finalMenuList.push(menu);
          }
        });
        finalCategoryData.push({ ...category, menuList: finalMenuList });
      }
    });

    let addedMenuData = JSON.parse(localStorage.getItem("saveDataFromApply"));
    if (finalCategoryData.length === 0 && addedMenuData.length > 0) {
      let finalAddedItems = [...addedMenuData];
      saveDataFromLocal?.addedItems?.length > 0 &&
        saveDataFromLocal?.addedItems.forEach((item1) => {
          addedMenuData.forEach((item2) => {
            if (
              item1.categoryName == item2.categoryName &&
              item2.hotelUserName?.includes(item1.hotelUserName)
            ) {
              finalAddedItems.push({ ...item1 });
            }

            if (item2.hotelUserName?.includes(item1.hotelUserName)) {
              finalAddedItems.push({ ...item1 });
            }
          });
        });
      finalAddedItems.map((item) => {
        if (
          item.hotelUserName[0] === userName ||
          item.hotelUserName === userName
        ) {
          let addedCategory = categoryData.filter(
            (cate) => cate.categoryName === item.categoryName
          );

          addedCategory[0].menuList = [item];
          finalCategoryData.push(addedCategory[0]);
        }
      });
    }

    if (
      finalCategoryData.length > 0 &&
      saveDataFromLocal &&
      (saveDataFromLocal.addedItems.length > 0 ||
        saveDataFromLocal.editedItems.length > 0 ||
        saveDataFromLocal.deletedItems.length > 0)
    ) {
      let addedItemsFromLocal = saveDataFromLocal.addedItems.filter(
        (item) => item.hotelUserName === userName
      );
      let deletedItemsFromLocal = saveDataFromLocal.deletedItems.filter(
        (item) => item.hotelUserName === userName
      );

      let editedItemsFromLocal = saveDataFromLocal.editedItems.filter(
        (item) => item.hotelUserName === userName
      );

      if (addedItemsFromLocal.length > 0) {
        addedItemsFromLocal = removeDuplicates(addedItemsFromLocal);
        //for added
        finalCategoryData.forEach((item1) => {
          addedItemsFromLocal.forEach((item2) => {
            if (item1.categoryName == item2.categoryName) {
              item1.menuList.push(item2);
            }
          });
        });
      }

      if (deletedItemsFromLocal.length > 0) {
        deletedItemsFromLocal = removeDuplicates(deletedItemsFromLocal);
        //for deletedItems
        finalCategoryData.forEach((item1) => {
          deletedItemsFromLocal.forEach((item2) => {
            if (item1.categoryName == item2.categoryName) {
              let finalMenuList = item1.menuList.filter(
                (menu) => menu.id != item2.id
              );
              item1.menuList = finalMenuList;
            }
          });
        });
      }

      if (editedItemsFromLocal.length > 0) {
        editedItemsFromLocal = removeDuplicates(deletedItemsFromLocal);

        //for edited
        finalCategoryData.forEach((item1) => {
          editedItemsFromLocal.forEach((item2) => {
            if (item1.categoryName === item2.categoryName) {
              item1.menuList = replaceObjectById(
                item1.menuList,
                item2.id,
                item2
              );
            }
          });
        });
      }
    }

    finalCategoryData = finalFilterDuplicates(finalCategoryData);
    if (fromhotelClick) {
      return finalCategoryData;
    }
    setCategoryHotelData(finalCategoryData);
  };

  function finalFilterDuplicates(arr) {
    arr = arr.map((item) => {
      if (item.menuList.length > 0) {
        let finalMenuList = removeDuplicates(item.menuList);
        return { ...item, menuList: finalMenuList };
      }
      return item;
    });

    return arr.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.categoryName === obj.categoryName)
    );
  }

  function removeDuplicates(arr) {
    return arr.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.id === obj.id && t.name === obj.name)
    );
  }

  function replaceObjectById(menuList, id, newObj) {
    const index = menuList.findIndex((item) => item.id === id);
    if (index !== -1) {
      menuList[index] = newObj;
    } else {
      console.log("Object with ID " + id + " not found.");
    }
    return menuList;
  }

  const handleBackClick = () => {
    if (showHotel) {
      setSelectedCity(null);
      setShowHotel(false);
      setShowCategory(false);
    } else if (showCategory) {
      setShowHotel(true);
      setShowCategory(false);
      setSelectedMenu([]);
    } else if (showMenu || isAddMenu) {
      setShowCategory(true);
      setShowMenu(false);
      setIsAddMenu(false);
      setIsEditMenu(false);
      if (isAddMenu) {
        getCategoryItems(hotelUsernameFromLogin);
      }
    } else if (isEditMenu) {
      getCategoryItems(hotelUsernameFromLogin);
      setShowMenu(true);
      setIsAddMenu(false);
      setIsEditMenu(false);
    }
  };

  const getTotalPrice = () => {
    let price = 0;
    selectedMenu.map((item) => (price += Number(item.price)));
    return price;
  };

  return (
    <>
      {(selectedCity || isFromLogin) && (
        <Chip
          className="back-icon"
          icon={<ArrowBackIcon />}
          label="Back"
          onClick={() =>
            isFromLogin && showCategory ? navigate("/") : handleBackClick()
          }
          color="primary"
          variant="outlined"
        />
      )}

      {!showHotel &&
        !showCategory &&
        !showMenu &&
        !isFromLogin && ( //for city data
          <BoxComponent
            data={data}
            title="Select City"
            isFromCity={true}
            handleButtonClick={handleButtonClick}
          />
        )}
      {showHotel &&
        !isFromLogin && ( //for hotels data
          <BoxComponent
            data={selectedCity.hotelList}
            title="Select Hotel"
            isFromCity={false}
            isFromHotel={true}
            handleButtonClick={handleButtonClick}
          />
        )}
      {showCategory && ( //for categories data
        <div>
          <BoxComponent
            data={categoryHotelData}
            title={isFromLogin ? "Categories" : "Select Category"}
            isFromCategory={true}
            isFromCity={false}
            isFromHotel={false}
            isFromLogin={isFromLogin}
            handleButtonClick={handleButtonClick}
          />
          <Container
            style={{ position: "fixed", bottom: "0", display: "flex" }}
            component="main"
            maxWidth="lg"
            sx={{ mb: 1 }}
          >
            <Paper
              variant="outlined"
              sx={{ my: { xs: 2, md: 1 }, p: { xs: 2, md: 3 } }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ margin: "7px 5px  0 0" }}>Rating : </span>
              <Rating
                style={{
                  border: "1px solid #faaf0",
                  borderRadius: "5px",
                  transform: 0.6,
                }}
                onChange={(event, newValue) =>
                  setHotelReviews({ ...hotelReviews, ratings: newValue })
                }
                value={hotelReviews?.ratings}
                size="large"
                sx={{ mt: 1 }}
                name="read-only"
                precision={0.5}
              />
            </Paper>
            <Paper
              variant="outlined"
              sx={{
                my: { xs: 2, md: 1 },
                p: { xs: 2, md: 3 },
                mx: 1,
              }}
            >
              Reviews :{" "}
              {hotelReviews?.reviews?.map((item, index) => (
                <Chip
                  style={{ margin: "0 2px" }}
                  key={index}
                  label={item}
                  color="primary"
                />
              ))}
            </Paper>
            <Paper
              variant="outlined"
              sx={{
                my: { xs: 2, md: 1 },
                p: { xs: 2, md: 3 },
                mx: 1,
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                required
                id="menuName"
                label="Write a Review "
                fullWidth
                variant="standard"
                value={hotelReviews.review}
                onChange={(e) =>
                  setHotelReviews({ ...hotelReviews, review: e.target.value })
                }
              />
              <Chip
                label="Add"
                color="primary"
                variant="outlined"
                onClick={() =>
                  setHotelReviews({
                    ...hotelReviews,
                    reviews:
                      hotelReviews?.reviews?.length > 0
                        ? hotelReviews.reviews.concat([hotelReviews.review])
                        : [hotelReviews.review],
                    review: "",
                  })
                }
              />
            </Paper>
          </Container>
        </div>
      )}
      {showMenu && ( //for menus data
        <BoxComponent
          data={selectedCatagory.menuList}
          title={isFromLogin ? "Menus" : "Select Menu"}
          isFromMenu={true}
          isFromCategory={false}
          isFromCity={false}
          isFromHotel={false}
          isFromLogin={isFromLogin}
          handleButtonClick={handleButtonClick}
        />
      )}
      {selectedMenu.length > 0 && ( //for cart
        <Button
          className="cart-icon"
          endIcon={<AddShoppingCartIcon />}
          size="small"
          variant="contained"
          onClick={() => setOpenModal(true)}
        >
          {selectedMenu.length} Items
        </Button>
      )}
      {openModal && (
        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setIsPlaceOrder(false);
          }}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style }}>
            <h2>Order Now</h2>
            {!isPlaceOrder ? (
              <>
                {selectedMenu.map((item, index) => (
                  <Card
                    style={{ position: "relative" }}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      minHeight: 10,
                      minWidth: 400,
                      maxWidth: 200,
                      mt: 1,
                    }}
                    key={index}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{}}>
                        <Typography component="div" variant="h5">
                          {item.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontWeight: 600 }}
                        >
                          ₹{item.price}
                        </Typography>
                      </CardContent>
                    </Box>
                    <CardMedia
                      className="card--image"
                      component="img"
                      sx={{ width: 171, height: 150 }}
                      image={item.img}
                      alt={item.name}
                    />
                  </Card>
                ))}
                <Paper
                  style={{ padding: "10px", margin: "10px", width: "70%" }}
                >
                  <Typography
                    component="div"
                    variant="h6"
                    style={{ fontWeight: 600 }}
                  >
                    Total Price : ₹{getTotalPrice()}{" "}
                  </Typography>
                </Paper>
              </>
            ) : (
              <h3>Order Placed...</h3>
            )}

            {!isPlaceOrder && (
              <Button sx={{ mt: 1 }} onClick={() => setIsPlaceOrder(true)}>
                Place Order
              </Button>
            )}
          </Box>
        </Modal>
      )}

      {showCategory &&
        isFromLogin && ( //for add menu
          <Chip
            className="add-icon"
            icon={<AddIcon />}
            label="Add Menu"
            color="primary"
            variant="outlined"
            onClick={() => handleButtonClick("Add")}
          />
        )}

      {(isAddMenu || isEditMenu) && (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 2, md: 1 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              {isAddMenu ? "Add Menu" : "Edit Menu"}
            </Typography>
            <CategoryForm
              categoryInfo={categoryInfo}
              setCategoryInfo={setCategoryInfo}
              isFromLogin={true}
              type={isAddMenu ? "Add Changes" : "Edit Changes"}
              handleButtonClick={handleButtonClick}
            />
          </Paper>
        </Container>
      )}
    </>
  );
};
export default Emenu;
