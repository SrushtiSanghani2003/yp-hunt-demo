import type React from "react";
import { auth_sidebar, yellowpanther_Logo } from "../../icons";

type AuthLayoutChildren = {
  children: React.ReactNode;
  contentWidth: string;
};

const AuthLayout = ({
  children,
  contentWidth = "max-w-sp387",
}: AuthLayoutChildren) => {
  return (
      <div className="grid md:grid-cols-5 grid-cols-1 h-[100vh] w-full">
        <div className="md:col-start-1 md:col-end-3">
          <div
            className=" md:w-[41.65%] mx-6 md:mx-0  h-full  md:h-[calc(100%-48px)] bg-center bg-cover no-repeat md:fixed md:left-6  mb-6 md:mt-6 mt-3 rounded-2xl"
            style={{ backgroundImage: `url(${auth_sidebar})` }}
          >
            <div className="auth-left-wrap flex h-full w-full justify-center items-center rounded-2xl overflow-hidden  bg-center bg-cover no-repeat">
              <img
                src={yellowpanther_Logo}
                alt="Yellow Panther"
                height="100"
                className=" md:w-[301px] w-[100px] "
              />
            </div>
          </div>
        </div>
        <div className="w-[100%] md:col-start-3 md:col-end-6  pt-5 md:pt-0 lg:ml-auto flex md:items-center justify-center">
          <div className=" ">
            <div className={`mx-auto ${contentWidth}`}>{children}</div>
          </div>
        </div>
      </div>
  );
};

export default AuthLayout;
