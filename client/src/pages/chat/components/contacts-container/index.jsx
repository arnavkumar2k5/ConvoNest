import { useEffect } from "react";
import NewDm from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ContactList from "@/components/ContactList";
import { setChannels, setDirectMessagesContact } from "@/store/chatSlice";
import CreateChannel from "./components/create-channel";

function ContactsContainer() {
  const directMessageContacts = useSelector((state) => state.chat.directMessageContacts);
  const channels = useSelector((state) => state.chat.channels);
  const dispatch = useDispatch();
  useEffect(() => {
    const getContacts = async () => {
      try {
        console.log("Fetching contacts...");
        const response = await axios.get(
          "/api/v1/contacts/get-contacts-for-dm",
          {
            withCredentials: true,
          }
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          console.log("Contacts received: ", response.data.data);
          dispatch(setDirectMessagesContact(response.data.data));
        } else {
          console.error("Failed to retrieve contacts");
        }
      } catch (error) {
        console.error(
          "Error fetching contacts:",
          error.response?.data || error.message
        );
      }
    };
    const getChannels = async () => {
      try {
        console.log("Fetching contacts...");
        const response = await axios.get(
          "/api/v1/channels/get-user-channels",
          {
            withCredentials: true,
          }
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          console.log("Contacts received: ", response.data.data);
          dispatch(setChannels(response.data.data));
        } else {
          console.error("Failed to retrieve contacts");
        }
      } catch (error) {
        console.error(
          "Error fetching contacts:",
          error.response?.data || error.message
        );
      }
    };
    getContacts();
    getChannels();
  }, [setDirectMessagesContact, setChannels]);
  return (
    <div className="w-full md:w-[20%] flex flex-col bg-[#121212] text-white h-screen">
      <h1 className="font-bold text-center text-xl p-2 pt-4"><span className="text-3xl font-extrabold text-red-900">C</span>ONVO<span className="text-3xl text-red-900">N</span>EST</h1>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hide">
            <ContactList contacts={directMessageContacts}/>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
          <CreateChannel/>
          </div>
          <div className="max-h-[38vh] overflow-y-auto scrollbar-hide">
            <ContactList contacts={channels} isChannel={true}/>
        </div>
        </div>
      </div>
      <div>
        <ProfileInfo />
      </div>
    </div>
  );
}

export default ContactsContainer;

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-extrabold text-opacity-90 text-sm pb-2">
      {text}
    </h6>
  );
};
