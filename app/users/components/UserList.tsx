"use client";
import { User } from "@prisma/client";
import React from "react";
import UserBox from "./UserBox";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <aside
      className="
  fixed
  inset-y-0
  pb-20
  lg:pb-0
  lg:left-20
  lg:w-80
  lg:block  
  overflow-y-auto
  border-r
  border-base-300
  block
  w-full
  left-0
"
    >
      <div
        className="
px-5"
      >
        <div className="flex-col">
          <div
            className="
            text-2xl
            font-bold
            text-base-content
            py-4
            "
          >
            People
          </div>
        </div>

        {users.map((user) => (
          <UserBox key={user.id} data={user} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
