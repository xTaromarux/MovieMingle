import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface MovieDetailsProps {
  backgroundImg?: string;
  cardImg?: string;
  titleImg?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  stateType?: string;
}

const MovieDetailsComponent: React.FC<MovieDetailsProps> = ({
  backgroundImg,
  cardImg,
  titleImg,
  title,
  subTitle,
  description,
  stateType,
}) => {
  const containerStyle = {
    backgroundImage: backgroundImg ? `url(${backgroundImg})` : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const movieInfoContainerStyle = {
    backgroundImage: "radial-gradient(circle, transparent, rgba(0,0,0,1))",
    padding: "200px 100px",
    width: "100vw",
    height: "100vh",
    display: "grid",
  };

  const [titleImgSrc, setTitleImgSrc] = useState<string>("");

  useEffect(() => {
    if (typeof titleImg === "string") {
      try {
        setTitleImgSrc(titleImg);
      } catch (error) {
        console.error("Błąd podczas parsowania obiektu filmu:", error);
      }
    }
  }, [titleImg]);

  return (
    <div style={containerStyle}>
      <div
        style={movieInfoContainerStyle}
        className="grid-cols-2 grid-rows-1 gap-4"
      >
        <div className="grid-rows-10 grid grid-cols-12 ">
          <Image
            src={titleImgSrc}
            alt={`${subTitle}`}
            width={400}
            height={300}
            quality={100}
            className="col-span-6 row-span-1 row-start-1"
            style={{ width: "auto" }}
          />

          <Button
            className="col-span-4 row-span-1 row-start-4"
            variant="contained"
            style={{
              backgroundColor: "white",
              color: "black",
              height: "70px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
            startIcon={
              <FontAwesomeIcon
                icon={faClapperboard}
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  color: "black",
                  padding: "10px",
                }}
              />
            }
          >
            Wybierz miejsce
          </Button>
          <p className="col-span-10 row-span-1 row-start-5 text-white">
            SubTitle: {subTitle}
          </p>
          <p className="col-span-12 row-span-1 row-start-6  text-xl text-white">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsComponent;
