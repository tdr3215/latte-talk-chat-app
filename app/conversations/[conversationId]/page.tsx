import React from "react";
import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
interface IParams {
  conversationId: string;
}

const ConversationDetails = async ({ params }: { params: IParams }) => {
  const { conversationId } = await params;
  const conversation = await getConversationById(conversationId);
  const messages = (await getMessages(conversationId)) ?? [];

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div
        className="h-full flex flex-col
    "
      >
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationDetails;
