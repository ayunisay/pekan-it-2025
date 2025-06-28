import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GROUP_CHAT_EP, USER_EP } from "@/core/endpoints";
import { useFetchData, usePostData } from "@/hooks/useFetchData";
import useToast from "@/hooks/useHotToast";
import type { ResponseApiType } from "@/types/apiType";
import type { GroupchatType } from "@/types/groupchat";
import type { UserType } from "@/types/user";
import { UsersRound, X } from "lucide-react";
import React, { useEffect, useState } from "react";

type PropsType = {
  selectedGroup: GroupchatType | null;
  userId: number;
  isOpen: boolean;
  handleOpen: () => void;
};

const AddGroupMemberDialog = React.memo(
  ({ isOpen, handleOpen, selectedGroup, userId }: PropsType) => {
    const [group, setGroup] = useState<GroupchatType | null>(selectedGroup);
    const [selectedUser, setSelectedUser] = useState<UserType[]>([]);
    const [
      { apiData: userFriends, loading: loadingGetUserFriend },
      { reCallAPI: reFetchUserFriends, setData: setUserFriends },
    ] = useFetchData<ResponseApiType<UserType[]>>({
      url: `${USER_EP}/friends/${userId}`,
      params: {
        status: "accepted",
      },
      initialCall: false,
    });

    const { postData: addMember } = usePostData(
      `${GROUP_CHAT_EP}/member`
    );

    const { pushToast, updateToast } = useToast();

    useEffect(() => {
      if (isOpen && !userFriends.data) {
        console.log("fetch");
        reFetchUserFriends();
      }
      const handleJoinedUser = () => {
        if (userFriends.data && group?.members) {
          const joinedMemberIds = new Set(
            group.members.map((member) => member.userId)
          );
          const filteredUserFriends = userFriends.data.filter((user) => {
            return !joinedMemberIds.has(user.id);
          });
          setUserFriends((prev) => ({ ...prev, data: filteredUserFriends }));
        } else {
          console.warn(
            "userFriends.data atau selectedGroup.members tidak tersedia."
          );
          // setUserFriends(prev => ({...prev, data: []}));
        }
      };
      handleJoinedUser();
      return () => {
        handleJoinedUser()
      }
    }, [isOpen, userFriends.code]);

    const handleOpenChange = () => {
      setSelectedUser([]);
      setUserFriends([] as unknown as ResponseApiType<UserType[]>);
      handleOpen();
    };

    const handleSelectMember = (member: UserType) => {
      setSelectedUser((prev) => [...prev, member]);
      const filteredFriends = [
        ...userFriends.data.filter((user) => user.id !== member.id),
      ];
      setUserFriends((prev) => ({ ...prev, data: filteredFriends }));
    };

    const handleUnselectMember = (member: UserType) => {
      const newSelectedUser = [
        ...selectedUser.filter((user) => user.id !== member.id),
      ];
      setSelectedUser(newSelectedUser);
      setUserFriends((prev) => ({ ...prev, data: [...prev.data, member] }));
    };

    const handleSubmit = async () => {
      const toastId = pushToast({
        message: "Menambahkan teman...",
        isLoading: true,
      })
      try {
        let data: unknown = [...selectedUser.map(el => el.id)]
        data = JSON.stringify(data);
        await addMember({
          userId: data,
        }, `${group?.id}?manyMember=true`);
        updateToast({
          toastId,
          message: "Berhasil",
        });

        const test = selectedUser.map((user) => ({
          userId: user.id,
          groupId: group?.id as number,
          user: user,
          group: group as GroupchatType,
        }));

        setGroup((prev) => {
          if(prev) {
            return {
              ...prev,
              members: [...(prev.members ?? []), ...test]};
          } else {
            return null
          }
        });
      } catch (error) {
        console.error(error);
        updateToast({
          toastId,
          message: "Gagal menambahkan teman.",
          isError: true
        })
      } finally {
        handleOpenChange()
      }
    };

    return (
      <Dialog onOpenChange={handleOpenChange} open={isOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#16243B]">
          <DialogHeader className="text-slate-50">
            <DialogTitle>Tambahkan teman</DialogTitle>
            <DialogDescription className="text-slate-300">
              Tambahkan temanmu kedalam grup untuk memulai diskusi denganmu!
            </DialogDescription>
          </DialogHeader>
          <div className="columns-2 gap-2 max-h-[8rem] overflow-y-auto">
            {selectedUser.length !== 0 &&
              selectedUser.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-2 rounded-full my-1"
                  onClick={() => handleUnselectMember(member)}
                >
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={"Avatar pic"}
                      className="w-7 h-7 rounded-full mr-4"
                    />
                  ) : (
                    <UsersRound className="w-7 h-7 rounded-full bg-gray-400 p-1" />
                  )}
                  <p className="text-sm font-semibold text-white">
                    {member.name}
                  </p>
                  <div className="hover:bg-[#333d50] rounded-full  cursor-pointer text-slate-50">
                    <X />
                  </div>
                </div>
              ))}
          </div>
          {isOpen && (
            <div className="bg-[#16243B] max-h-[25rem] overflow-auto">
              {loadingGetUserFriend ? (
                <></>
              ) : !userFriends || userFriends?.data?.length === 0 ? (
                <></>
              ) : (
                userFriends.data?.map((user) => (
                  <FriendList
                    data={user}
                    key={user.id}
                    handleSelectUser={handleSelectMember}
                  />
                ))
              )}
            </div>
          )}

          {selectedUser.length !== 0 && (
            <DialogFooter>
              <Button className="cursor-pointer" onClick={handleSubmit} type="submit">Tambahkan</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);
export default AddGroupMemberDialog;

type PropsFriendListType = {
  data: UserType;
  handleSelectUser: (user: UserType) => void;
};

function FriendList({ data, handleSelectUser }: PropsFriendListType) {
  return (
    <div
      className="flex items-center gap-2 hover:bg-[#333d50] cursor-pointer p-2 rounded-md"
      onClick={() => handleSelectUser(data)}
    >
      {data.avatar ? (
        <img
          src={data.avatar}
          alt={"Avatar pic"}
          className="w-10 h-10 rounded-full mr-4"
        />
      ) : (
        <UsersRound className="w-10 h-10 rounded-full bg-gray-400 p-1" />
      )}
      <h2 className="text-lg font-semibold text-white">{data.name}</h2>
    </div>
  );
}
