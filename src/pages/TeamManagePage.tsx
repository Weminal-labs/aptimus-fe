import React, { useEffect } from "react";
import { Avatar } from "@nextui-org/react";
import useAuth from "../hooks/useAuth";
import { Button } from "@nextui-org/react";
import CreateTeamModal from "../components/CreateTeamModal";
import { LuUsers2 } from "react-icons/lu";
import { getMemberTeam, removeMember } from "../utils/team";
import { Team_user } from "../@types/context";
import AddMemberModal from "../components/AddMemberModal";
import ConfirmModal from "../components/ConfirmModal";

const TeamManagePage = () => {
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] =
    React.useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = React.useState(false);
  const [teamMembers, setTeamMembers] = React.useState<Team_user[]>([]);
  const [isLeader, setIsLeader] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<string | null>(
    null
  );
  const { user, team } = useAuth();

  useEffect(() => {
    if (!team) return;

    async function getMember(team_id: string) {
      const members: Team_user[] = await getMemberTeam(team_id);
      setTeamMembers(members);

      const isLeader =
        members.filter((m) => {
          return m.id === user?.id && m.is_leader;
        }).length != 0;
      setIsLeader(isLeader);
    }

    getMember(team?.id);
  }, [team]);

  const deleteMember = async () => {
    if (!selectedMember || !team) return;

    const data = await removeMember(team?.id, selectedMember);
    if (data) {
      setTeamMembers((prev) => {
        if (!prev) return [];

        return prev.filter((m) => m.id !== selectedMember);
      });
      setSelectedMember(null);
    }
  };

  const handleClickDeleteMember = (user_id: string) => {
    setSelectedMember(user_id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <CreateTeamModal
        isOpen={isCreateTeamModalOpen}
        onOpenChange={setIsCreateTeamModalOpen}
      />
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onOpenChange={setIsAddMemberModalOpen}
        setTeamMembers={setTeamMembers}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        action={deleteMember}
        title="Warning"
        description="Do You Really Want To Delete This Member?"
      />
      <div className="w-full h-full flex">
        {team ? (
          <div className="flex flex-col w-full">
            <div className="flex gap-5 border-b w-full pb-8">
              <Avatar
                src={team.image}
                size="lg"
                radius="md"
                className="w-32 h-32"
              />
              <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-semibold">{team.name}</h1>
                  <p className="text-grayText text-sm">hello</p>
                </div>
                <div className="flex space-x-1 items-center text-grayText">
                  <LuUsers2 className=" text-lg" />
                  <p className="text-sm">
                    <b className="text-black">{teamMembers.length}</b> members
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full py-8">
              <div className="w-full flex justify-between">
                <h1>Members</h1>
                <Button
                  onClick={() => {
                    setIsAddMemberModalOpen(true);
                  }}
                >
                  Add Member
                </Button>
              </div>

              <div className="relative overflow-x-auto mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers &&
                      teamMembers?.map((m) => {
                        return (
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {m.email}
                            </th>
                            <td className="px-6 py-4">
                              {m.is_leader ? "Leader" : "Member"}
                            </td>

                            <td className="px-6 py-4">
                              {isLeader && m.id !== user?.id ? (
                                <>
                                  <Button
                                    color="primary"
                                    className="font-semibold"
                                    onClick={() => {
                                      handleClickDeleteMember(m.id);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </>
                              ) : (
                                <p className="">-</p>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
            <h1 className="w-fit">You don't have your own team</h1>
            <Button
              variant="bordered"
              className=" text-primary border-primary font-semibold"
              onClick={() => {
                setIsCreateTeamModalOpen(true);
              }}
            >
              Create Team
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManagePage;
