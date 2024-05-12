import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import MediaCard from "./Card";
import EmenuImage from "../assets/images/hotel.png";
import QRImage from "../assets/images/qrimage.png";
import StoreImage from "../assets/images/store.png";
import ApplyStoreImage from "../assets/images/applyforstore.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const buttons = [
    <Button key="one" onClick={() => navigate("/list")}>
      <MediaCard name="Emenu" isHome={true} imgUrl={EmenuImage} />
    </Button>,
    <Button key="two" onClick={() => navigate("/qr")}>
      <MediaCard name="Scan QR Code" isHome={true} imgUrl={QRImage} />
    </Button>,
    <Button key="three" onClick={() => navigate("/login")}>
      <MediaCard name="Hotel Login" isHome={true} imgUrl={StoreImage} />
    </Button>,
    <Button key="four" onClick={() => navigate("/apply")}>
      <MediaCard
        name="Apply For Hotel"
        isHome={true}
        imgUrl={ApplyStoreImage}
      />
    </Button>,
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
      className="home"
    >
      <h2 style={{ textAlign: "left" }}>All Apps</h2>
      <ButtonGroup size="large" aria-label="Large button group">
        {buttons}
      </ButtonGroup>
    </Box>
  );
}
