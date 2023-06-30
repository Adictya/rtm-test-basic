import React from "react";
import ReactDOM from "react-dom/client";
import AppBuilder from "./SimpleExample/App";
import SimpleApp from "./AppBuilderMirror/AppBuilder";

let notstrict = true;
let appbuilder = false;

const urlParams = new URLSearchParams(window.location.search);

notstrict = Boolean(urlParams.get("notstrict"));
appbuilder = Boolean(urlParams.get("appbuilder"));

const App = appbuilder ? SimpleApp : AppBuilder;

if (!notstrict) {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
  );
}
