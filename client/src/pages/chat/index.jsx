import { useSelector } from "react-redux";
import ChatContainer from "./components/chat-container";
import ContactsContainer from "./components/contacts-container";
import EmptyContainer from "./components/empty-chat-container";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

function Chat() {
  const userInfo = useSelector((state) => state.auth.userData?.data);
  const selectChatType = useSelector((state) => state.chat.selectedChatType);
  const navigate = useNavigate();

  console.log("bhai aa gaye", userInfo);

  let decodedUser = null;
  if (userInfo?.accessToken) {
    try {
      decodedUser = jwtDecode(userInfo.accessToken);
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }

  useEffect(() => {
    if (userInfo && (!decodedUser || !decodedUser.fullName)) {
      alert("Please Setup User profile");
      navigate("/profile");
    }
  }, [userInfo, decodedUser, navigate]);

  return (
    <div className="flex text-white overflow-hidden">
      <ContactsContainer />
      {selectChatType === undefined ? <EmptyContainer /> : <ChatContainer />}
    </div>
  );
}

export default Chat;
