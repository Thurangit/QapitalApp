import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//store
import { Provider } from "react-redux";
//reducer
import { store } from "./store";

import Index from "./views/index";
import { IndexRouters } from "./router";
import { LandingModulesRouter } from './router/landing-modules-router'
import { SimpleRouter } from "./router/simple-router";
import { DefaultRouter } from "./router/default-router";
import { InvitationsRouter } from "./router/invitations-router";
import { ExternPagesRouter } from "./router/extenpages-router";


import SignIn from "./views/dashboard/auth/sign-in";
import IndexModules from "./views/index";
import Home from "./views/landing-modules/home";
import Blog from "./views/landing-modules/blog";

import SignUp from "./views/dashboard/auth/sign-up";

const router = createBrowserRouter([

  {
    path: 'modules',
    element: <IndexModules />,
  },

  {
    path: 'signin',
    element: <SignIn />,
  },

  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: 'landing',
    element: <Blog />,
  },
  ...DefaultRouter,
  ...IndexRouters,
  ...SimpleRouter,
  ...InvitationsRouter,
  ...LandingModulesRouter,
  ...ExternPagesRouter,
], { basename: process.env.PUBLIC_URL });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
