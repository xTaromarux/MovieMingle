import React from "react";
import ErrorPage from "../components/ErrorPage";

interface CustomErrorProps {
  statusCode: number;
}

const CustomError: React.FC<CustomErrorProps> = ({ statusCode }) => {
  return <ErrorPage statusCode={statusCode} />;
};

export default CustomError;
