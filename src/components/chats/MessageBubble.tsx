import React from "react";
import type { PrivateChatMessageType } from "../../types/privatechat";
import { formatMessageDeliveryTime } from "../../utils/string";

const MessageBubble = React.memo(({
  message,
  isSender,
}: {
  message: PrivateChatMessageType;
  isSender: boolean;
}) => (
  <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${
        isSender
          ? "bg-[#4A90E2] text-white rounded-br-none"
          : "bg-[#385484] text-white rounded-bl-none"
      }`}
    >
      <p className="break-words">{message.content}</p>
      <span className="text-[11px]">
        {formatMessageDeliveryTime(message.createdAt)}
      </span>
    </div>
  </div>
));

export default MessageBubble;