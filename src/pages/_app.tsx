import type { AppProps } from 'next/app';
import '../app/layout.css';
import FooterNavigation from '@/components/FooterNavigation/FooterNavigation';
import HeaderComponent from '@/components/HeaderComponent/HeaderComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>시민의 소리! SISO</title>
        <meta name="description" content="건강한 정치 커뮤니티" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&family=Alfa+Slab+One&family=Noto+Sans+KR:wght@100..900&family=Gothic+A1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <HeaderComponent />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Component {...pageProps} />
      <FooterNavigation />
    </>
  );
}
