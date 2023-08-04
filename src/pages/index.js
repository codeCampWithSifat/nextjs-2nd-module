import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
// import Banner from "@/components/UI/Banner";
import AllNews from "@/components/UI/AllNews";
import { useGetNewsQuery } from "@/redux/api/api";
import dynamic from "next/dynamic";

const HomePage = ({ allNews }) => {
  // console.log(allNews);
  const { data, isLoading, isError, error } = useGetNewsQuery();
  // console.log(data);
  const DynamicHeader = dynamic(() => import("@/components/UI/Banner"), {
    loading: () => (
      <h1
        style={{
          fontSize: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </h1>
    ),
    ssr: false,
  });
  return (
    <>
      <Head>
        <title>PH-News Portal</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicHeader />
      <AllNews allNews={allNews} />
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// export const getStaticProps = async () => {
//   const res = await fetch(`http://localhost:5000/news`);
//   const data = await res.json();

//   return {
//     props: {
//       allNews: data,
//     },
//     revalidate: 5,
//   };
// };

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/api/news`);
  const data = await res.json();
  // console.log(data);

  return {
    props: {
      allNews: data,
    },
  };
};
