import { Provider, useSelector } from "react-redux";
import type { AppProps } from "next/app";
import { store } from "../store";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../scss/home.styles.scss'
import NavBar from "../components/Navbar";
import AuthProvider from "../hooks/AuthContext";
function MyApp({ Component, pageProps }: AppProps) {
  const queryclient = new QueryClient()

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryclient}>
          <NavBar />
          <Component {...pageProps} />
      </QueryClientProvider>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
