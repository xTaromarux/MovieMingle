import React from "react";
import Carousel from "react-material-ui-carousel";
import { CardMedia, Typography } from "@mui/material";
import Image from "next/image";

export interface SettingsT {
  autoPlay: boolean;
  animation: "fade" | "slide";
  indicators: boolean;
  duration: number;
  navButtonsAlwaysVisible: boolean;
  navButtonsAlwaysInvisible: boolean;
  fullHeightHover: boolean;
  cycleNavigation: boolean;
  swipe: boolean;
  [key: string]: unknown;
}

export const DefaultSettingsT: SettingsT = {
  autoPlay: true,
  animation: "fade",
  indicators: true,
  duration: 1000,
  navButtonsAlwaysVisible: false,
  navButtonsAlwaysInvisible: false,
  cycleNavigation: true,
  fullHeightHover: true,
  swipe: true,
};

const ImageSlider = () => {
  return (
    <div
      className="flex justify-center"
      style={{
        width: "100%",
      }}
    >
      <Carousel className="SecondExample" {...DefaultSettingsT}>
        {items.map((item, index) => {
          return <Project item={item} key={index} />;
        })}
      </Carousel>
      <br />
    </div>
  );
};

type Item = {
  name: string;
  description: string;
  color: string;
  image: string;
  logoIamge: string;
  href: string;
};

interface ProjectProps {
  item: Item;
}

function Project({ item }: ProjectProps) {
  return (
    <CardMedia className="Media " image={item.image} title={item.name}>
      <Typography variant="h5">
        <Image
          src={item.logoIamge}
          alt={`${item.description}`}
          width={400}
          height={300}
          quality={100}
          style={{ width: "auto" }}
        />
      </Typography>
    </CardMedia>
  );
}

const items: Item[] = [
  {
    name: "",
    description: "",
    color: "#64ACC8",
    image: "/images/Moana_backgroundImg2.jpeg",
    logoIamge: "/images/Moana_titleImg.png",
    href: "/",
  },
  {
    name: "",
    description: "",
    color: "#7D85B1",
    image: "/images/Bao_backgroundImg.jpeg",
    logoIamge: "/images/Bao_titleImg.png",
    href: "/",
  },
  {
    name: "",
    description: "",
    color: "#CE7E78",
    image: "/images/Auntie_EDNA_backgroundImg.jpeg",
    logoIamge: "/images/Auntie_EDNA_titleImg.png",
    href: "/",
  },
];

export default ImageSlider;
