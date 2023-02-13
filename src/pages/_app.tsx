import type { AppProps } from "next/app";
import MainFrame from "../components/atom/main";
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languages from '../assets/languages.json';


i18n.use(initReactI18next).init({
  ...languages,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <MainFrame>
        <Component {...pageProps} />
      </MainFrame>
    </ThemeProvider>
  );
}