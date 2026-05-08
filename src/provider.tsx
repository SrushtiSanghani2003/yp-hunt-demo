import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux-toolkit/store";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import LoadingScreen from "./components/ui/loading";
import { ScrollProvider } from "./hooks/ScrollContext";
import ErrorBoundary from "./components/ErrorBoundry";

const queryClient = new QueryClient();

const AppProvider = () => {
  useEffect(() => {
    const handleWheel = (_e: WheelEvent) => {
      const active = document.activeElement;
      if (
        active &&
        active.tagName === "INPUT" &&
        (active as HTMLInputElement).type === "number"
      ) {
        (active as HTMLInputElement).blur(); // Prevent value change by unfocusing
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<LoadingScreen />}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <HelmetProvider>
                <ScrollProvider>
                  <RouterProvider router={createAppRouter} />
                </ScrollProvider>
              </HelmetProvider>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default AppProvider;
