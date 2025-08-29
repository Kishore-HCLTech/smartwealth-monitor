import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Loader from "./components/Loader";

function App() {
  return (
    <Router>
      {/* <div>Loading...</div> */}
      <Suspense fallback={<Loader />}>
        <Layout />
        <Toaster richColors position="top-right" />
      </Suspense>
    </Router>
  );
}

export default App;
