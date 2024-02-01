import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TopScreen } from "./screens/Top.screen";
import { PageScreen } from "./screens/Page.screen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TopScreen />,
  },
  {
    path: "/pages/:pageId",
    element: <PageScreen />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
