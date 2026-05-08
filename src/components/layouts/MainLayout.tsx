import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import { selectState } from "../../redux-toolkit/disclosureSlice";
import Sidebar from "../sidebar";

const MainLayout = () => {
  const { collapsed } = useSelector(selectState);

  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-96px)] h-full">
        <Sidebar />
        <div
          className={`flex-1 transition-all duration-300 ease-in-out  ${
            collapsed ? "md:ml-sp70 ml-12 " : "ml-sp230 "
          }  bg-f6f6f6`}
          style={{
            width: collapsed ? "calc(100% - 70px)" : "calc(100% - 230px)",
          }}
        >
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
