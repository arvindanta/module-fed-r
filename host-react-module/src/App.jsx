import React, { Suspense } from "react";
import "./App.css";
import Vaider from "./components/Vaider";
const Kylo = React.lazy(() => import("remote_react_module/Kylo"));
function App() {
  return (
    <>
      <div className="Text">
        This is the React container App hosted at localhost:8080
      </div>
      <div className="Host-Container">
        <Vaider />
        <hr />
        <Suspense fallback={"loading..."}>
          <hr />
          <Kylo />
        </Suspense>
      </div>
    </>
  );
}

export default App;
