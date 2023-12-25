import ImageSlider from "../components/ImageSlider";
import ReactCardSlider from "../components/ReactCardSlider";
import { PageLayout } from "../components/Layout";
import Head from "next/head";

export default function Home() {
  const slidesAvailable = [
    {
      image: "/images/Legends_cardImg.jpeg",
    },
    {
      image: "/images/Mickey_mouse_cardImg.jpeg",
    },
    {
      image: "/images/Moana_cardImg.jpeg",
    },
    {
      image: "/images/My_music_story_cardImg.jpeg",
    },
    {
      image: "/images/Raya_cardImg.jpeg",
    },
    {
      image: "/images/Soul_cardImg.jpeg",
    },
    {
      image: "/images/Tangled_cardImg.jpeg",
    },
  ];

  const slidesSoon = [
    {
      image: "/images/The_Simpsons_cardImg.jpeg",
    },
    {
      image: "/images/The_falcon_and_the_winter_soldier_cardImg.jpeg",
    },
    {
      image: "/images/Assembled_cardImg.jpeg",
    },
    {
      image: "/images/Burrow_cardImg.jpeg",
    },
  ];
  return (
    <>
      <Head>
        <title>Vocabulary learning App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <ImageSlider />

        <div
          className=""
          style={{ width: "100%", padding: "100px 0 20px 20px" }}
        >
          <a className=" pl-2 text-xl font-bold uppercase tracking-wide text-white no-underline hover:no-underline">
            DOSTĘPNE
          </a>
          <ReactCardSlider slides={slidesAvailable} />
          <a className="text-xl font-bold uppercase tracking-wide text-white no-underline hover:no-underline ">
            WKRÓTCE
          </a>
          <ReactCardSlider slides={slidesSoon} />
        </div>
      </PageLayout>
    </>
  );
}
