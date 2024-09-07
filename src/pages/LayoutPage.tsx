import SideBar from "../components/SideBar";
import Header from "../components/layouts/Header";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { getMainTeam } from "../utils/team";

function LayoutPage() {
  const { user, setUser, team, setTeam } = useAuth();

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("account")!));
    }

    const getTeam = async () => {
      if (!user) return;
      const team = await getMainTeam(user.id);
      setTeam(team);
    };

    if (!team) {
      // fetch team
      getTeam();
    }
  }, [user, team]);

  return (
    <div className="flex h-screen w-screen bg-home-bg bg-no-repeat bg-cover">
      <SideBar />
      <div className="w-full grow h-full flex flex-col">
        <Header />
        <div className="grow p-10 overflow-scroll">
          <div className="w-max-full min-h-full bg-white rounded-2xl shadow-2xl p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutPage;
