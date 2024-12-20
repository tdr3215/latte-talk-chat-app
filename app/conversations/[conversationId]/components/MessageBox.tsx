"use client";
import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface MessageBoxProps {
  isLast?: boolean;
  data: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
  const session = useSession();

  const isOwn = session.data?.user?.email === data?.sender?.email;

  //   Everyone who IS NOT the sender && hasSeen the message by Name : Array => String of Users
  const seenList = (data.seen || [])
    .filter((user) => user?.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(",");

  // Dynamic Class Variables
  const container = clsx(`flex gap-3 p-4`, isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx(`flex flex-col gap-2`, isOwn && "items-end");
  const message = clsx(
    `text-sm w-fit overflow-hidden`,
    isOwn
      ? `bg-secondary text-secondary-content`
      : `bg-primary text-primary-content`,
    data.image ? `rounded-md p-0` : `rounded-full py-2 px-3`
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-secondary-content">
            {data.sender.name}
          </div>
          {/* Date Sent */}
          <div className="text-sm text-success">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        {/* Message Body */}
        <div className={message}>
          {data.image ? (
            <Image
              alt="image"
              height={288}
              width={288}
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
