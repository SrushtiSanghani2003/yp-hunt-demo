import "./App.css";
import AppProvider from "./provider";
import { Toaster } from "react-hot-toast";
import "react-phone-input-2/lib/style.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "react-photo-view/dist/react-photo-view.css";
// @ts-ignore
import "swiper/css";
import ScrollToTopButton from "./components/ui/scrollToTop/ScrollToTopButton";

function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <ScrollToTopButton />
      <AppProvider />
    </>
  );
}

export default App;
