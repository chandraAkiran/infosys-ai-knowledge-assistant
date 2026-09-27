import Pageheader from "@/components/common/Pageheader";
import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatPage() {
  return (
    <div>
      <Pageheader
        title="AI Assistant"
        description="Ask questions, review grounded answers, and inspect their sources."
      />

      <ChatWindow />
    </div>
  );
}