// import {  mediaIcon, pageIcon, phoneIcon, userIcon } from "../icons";
import ComingSoon from "./ui/ComingSoon/ComingSoon";

const Dashboard = () => {
  // const getGreeting = () => {
  //   const hour = new Date().getHours();
  //   if (hour < 12) return "Good Morning!";
  //   if (hour < 17) return "Good Afternoon!";
  //   return "Good Evening!";
  // };
  // const tabs = [
  //   {
  //     label: "Contact",
  //     icon: phoneIcon,
  //   },
  //   {
  //     label: "Live Blog",
  //     icon: pageIcon,
  //   },
  //   {
  //     label: "Media",
  //     icon: mediaIcon,
  //   },
  //   {
  //     label: "Players",
  //     icon: userIcon,
  //   },
  // ];

  return (
    <div className="">
      <ComingSoon />
      {/* <div className="mt-sp54">
        <h2 className="text-2xl font-bold mb-6">{getGreeting()}</h2>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-3 items-start">
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-2">
            {tabs &&
              tabs.map((tab) => (
                <div
                  key={tab.label}
                  className="flex items-center justify-between hover:shadow-xl hover:duration-500 bg-white px-2 py-sp10 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-sp35 h-sp35  bg-f6f6f6 rounded-full flex justify-center items-center">
                      <img src={tab.icon} />
                    </div>
                    <p>{tab.label}</p>
                  </div>
                  <img src={arrowRight} />
                </div>
              ))}
          </div>
          <div className="bg-white rounded-2xl px-7 py-7">
            <h3 className="text-2xl font-extrabold mb-2">
              The Latest From Noir
            </h3>
            <div className="mb-4">
              <h5 className="text-base font-extrabold">
                New Audience Builder Feature Release!
              </h5>
              <p className="text-xs text-acacac max-w-sp411">
                Live now! Check out our new features, Folders and the Audience
                Sync Panel, right here !
              </p>
            </div>
            <div>
              <h5 className="text-sm font-extrabold">
                Want to be kept in the loop on future product releases and
                updates?
              </h5>
              <p className="text-xs text-acacac">
                Head to the main Noir website, let us know which products you're
                interested in and sign up for future comes... we'll be in touch!
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
