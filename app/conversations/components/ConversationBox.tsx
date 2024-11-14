"use client";
import { FullConversationType } from "@/app/types";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  // REDIRECT TO /CONVERSATIONS/:ID
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  //LAST MESSAGE
  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  // USER EMAIL
  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  // Status of user seeing last message
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    // list of users who have seen the message
    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }
    // Return everyone(if they exist) who isn't ME && has seen the last message
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  // Last Message Text
  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image.";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation.";
  }, [lastMessage]);
  console.log(otherUser);
  return (
    <div
      className={clsx(
        `
        w-full
        relative
        flex
        items-center
        space-x-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
      onClick={handleClick}
    >
      <Avatar user={otherUser} />
    </div>
  );
};

export default ConversationBox;
