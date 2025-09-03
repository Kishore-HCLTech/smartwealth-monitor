import { Toaster } from "@/components/ui/sonner";
import { Suspense, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Loader from "./components/Loader";
import { useAppDispatch } from "./hooks/hooks";
import { setupInterceptors } from "./axiosInstance";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
      setupInterceptors(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, info) => {
          console.error("Error caught by ErrorBoundary:", error);
          console.error("Component stack:", info.componentStack);
        }}
        onReset={() => {
          // Optional: reset app state or navigate
        }}
      >
        <Suspense fallback={<Loader />}>
          <Layout />
          <Toaster richColors position="top-right" />
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
