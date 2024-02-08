// src/pages/_app.tsx
import "../styles/globals.css";
import "../styles/menu.css";
import "../styles/Slider.css";
import "../styles/ImageSlider.scss";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import Menu from "../components/Menu";

const MovieMingle: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const CLERK_PUBLISHABLE_KEY =
    "pk_test_b3Blbi1zYWxtb24tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA";

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} {...pageProps}>
      <Menu />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MovieMingle);
