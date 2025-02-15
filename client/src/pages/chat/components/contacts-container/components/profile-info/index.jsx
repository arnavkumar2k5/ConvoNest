import { Avatar } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getColor } from "@/lib/utils";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {IoMdLogOut} from "react-icons/io"
import { logout } from "@/store/authSlice";

function ProfileInfo() {
  const userInfo = useSelector((state) => state.auth.userData?.data?.user);
  const [fullName, setFullName] = useState(userInfo?.fullName || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [image, setImage] = useState(userInfo?.image || "");
  const [selectedColor, setSelectedColor] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  console.log("bhaiya yeh dekho:- ", userInfo)

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Navigate after logout
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-center w-full md:w-[20%] bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
        <Avatar className="h-12 w-12 rounded-full overflow-hidden">
          {image ? (
            <AvatarImage
              src={image}
              alt="profile"
              className="object-cover w-full h-full bg-black"
            />
          ) : (
            <div
              className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                selectedColor
              )}`}
            >
              {fullName ? fullName.split("").shift() : email.split("").shift()}
            </div>
          )}
        </Avatar>
        </div>
        <div>{fullName}</div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaEdit
                  className="text-white text-xl font-medium"
                  onClick={() => navigate("/profile")}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoMdLogOut
                  className="text-white text-xl font-medium"
                  onClick={handleLogout}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
