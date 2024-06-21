import { RouterProvider } from "react-router-dom";
import { browserRoute as route } from "./routes/route";

const App = () => {

  return (
    <div className="fade-in">
      <RouterProvider router={route}/>
    </div>
  );
};

export default App;
