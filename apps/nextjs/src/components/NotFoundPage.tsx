import Link from "next/link";
import React from "react";
import { Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <div
      className="grid w-full grid-cols-2 items-center justify-center"
      style={{
        minHeight: "100dvh",
      }}
    >
      <div className="grid items-center justify-center">
        <Typography variant="h1" className="text-white">
          404
        </Typography>
        <Typography variant="h6" className="text-white">
          Strona, której szukasz, nie istnieje.
        </Typography>
        <Link href="/" className="text-white hover:underline">
          Wróć na stronę główną
        </Link>
      </div>
      <div
        className="h-full"
        style={{
          background: "url('/images/Tangled_backgroundImg.jpeg') no-repeat",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};
export default NotFoundPage;
