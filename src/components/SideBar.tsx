import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaUserGroup } from "react-icons/fa6";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  {
    id: 1,
    name: "Home",
    href: "/",
    icon: <GoHomeFill className="text-2xl" />,
  },
  {
    id: 2,
    name: "Manage Team",
    href: "/team",
    icon: <FaUserGroup className="text-2xl" />,
  },
];

const SideBar = () => {
  const [activeTab, setActiveTab] = useState(1);
  let location = useLocation();

  useEffect(() => {
    const parts = location.pathname.split("/");
    const tabIndex = tabs.find((tab) => {
      return tab.href.replace("/", "") === parts[1];
    });

    if (tabIndex) {
      setActiveTab(tabIndex.id);
    } else {
      setActiveTab(1);
    }
  }, [location]);

  return (
    <div
      id="sidebar"
      className="h-full py-10 px-4 w-80 bg-white/10 backdrop-blur-lg text-black"
    >
      <Link to="/">
        <Image src="/logos/logo-white.svg" className="ps-5" />
      </Link>

      <nav className="mt-10 w-full">
        <ul>
          {tabs.map((tab) => {
            return (
              <li
                className=""
                onClick={() => {
                  setActiveTab(tab.id);
                }}
              >
                <Link
                  to={tab.href}
                  className={clsx(
                    " py-4 flex items-center  px-5 rounded-lg",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-primary/40 to-transparent text-white"
                      : "text-white/70"
                  )}
                >
                  <span
                    className={clsx(
                      "p-1 rounded-lg  me-2",
                      activeTab === tab.id && "bg-primary text-white"
                    )}
                  >
                    {tab.icon}
                  </span>
                  <p>{tab.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
