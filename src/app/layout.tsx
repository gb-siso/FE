import type { Metadata } from 'next';
import './globals.css';
import FooterNavigation from '@/components/FooterNavigation/FooterNavigation';
import HeaderComponent from '@/components/HeaderComponent/HeaderComponent';
import StyledComponentsRegistry from '@/lib/registry';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: '시민의 소리! SISO',
  description: '건강한 정치 커뮤니티',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&family=Alfa+Slab+One&family=Noto+Sans+KR:wght@100..900&family=Gothic+A1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <FooterNavigation />
      </body>
    </html>
  );
}
