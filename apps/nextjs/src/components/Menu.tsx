import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth, UserButton } from "@clerk/nextjs";

const Menu: React.FC = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav id="header" className="menu fixed top-0 z-30 w-full py-1">
      <div className="container mx-auto mt-0 flex w-full flex-wrap items-center justify-between px-6 py-3">
        <label htmlFor="menu-toggle" className="block cursor-pointer md:hidden">
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className="order-3 hidden w-full md:order-1 md:flex md:w-auto md:items-start"
          id="menu"
        >
          <nav>
            <ul className="items-center justify-between pt-4 text-base text-white md:flex md:pt-0">
              <li>
                <Link
                  href="/"
                  className="inline-block py-2 px-4 no-underline hover:text-gray-200 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/repertuar"
                  className="inline-block py-2 px-4 no-underline hover:text-gray-200 hover:underline"
                >
                  Repertuar
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="order-1 md:order-2">
          <Link
            href="/"
            className="flex items-center text-xl font-bold tracking-wide text-white no-underline hover:no-underline "
          >
            <FontAwesomeIcon
              icon={faFilm}
              style={{
                width: "2rem",
                height: "2rem",
                marginRight: "1rem",
                color: "#ffffff",
              }}
            />
            MovieMingle
          </Link>
        </div>

        <div className="order-2 flex items-center md:order-3" id="nav-content">
          {!isSignedIn && (
            <div className="flex items-center justify-center">
              <Link
                href="/sign-in"
                className="inline-block pl-3 no-underline hover:text-black"
              >
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{
                    width: "2rem",
                    height: "2rem",
                    color: "#ffffff",
                  }}
                />
              </Link>
            </div>
          )}
          {isSignedIn && (
            <div className="flex items-center justify-center">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "2rem",
                      height: "2rem",
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
