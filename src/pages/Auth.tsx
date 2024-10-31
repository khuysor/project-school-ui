import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "../util/auth";
import { routes } from "../routes/routes";

const Authentication = () => {
  if (getAuth()) {
    return <Navigate to={routes.dashboard} replace={true} />;
  }

  return (
    <div className="relative h-dvh">
      <div className="absolute inset-x-0 -top-48 -bottom-14 overflow-hidden bg-indigo-50">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white z-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white z-0 text-blue-400"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-auto">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12 h-screen flex items-center justify-center">
          <div className="h-auto  px-6 py-6 mx-auto lg:py-0 ">
            <div
              className="bg-white rounded-2xl shadow-2xl w-full sm:w-96"
              style={{
                maxWidth: "calc(100vw - 5rem)",
                padding: "2.375rem 1rem 3rem",
              }}
            >
              <div className="p-6 space-y-2 md:space-y-6 md:p-10">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
