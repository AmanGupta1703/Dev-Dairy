import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import { AppLayout, AuthLayout } from "./components";

import { Home, Login, SignUp } from "./pages";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <h1>Add post</h1>
          </AuthLayout>
        ),
      },
      {
        path: "/posts",
        element: (
          <AuthLayout authentication>
            <h1>All Posts</h1>
          </AuthLayout>
        ),
      },
      {
        path: "/update-post/:id",
        element: (
          <AuthLayout authentication>
            <h1>Update Post</h1>
          </AuthLayout>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <AuthLayout authentication>
            <h1>A Post</h1>
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
