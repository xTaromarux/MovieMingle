import React from "react";

interface ErrorPageProps {
  statusCode: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md rounded-md bg-white p-8 shadow-md">
        <h1 className="mb-4 text-4xl font-semibold">
          Oops! Coś poszło nie tak.
        </h1>
        <p className="mb-6 text-gray-600">
          Przepraszamy, ale wydaje się, że coś nie działa prawidłowo. Prosimy
          spróbować ponownie później.
        </p>
        <p className="text-gray-600">
          Kod błędu: <span className="font-semibold">{statusCode}</span>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
