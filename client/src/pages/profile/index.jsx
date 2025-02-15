import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logout } from "@/store/authSlice";

function Profile() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userData?.data);
  console.log("bete yeh dekh", userInfo);
  const accessToken = userInfo?.accessToken;

  const decodedUserInfo = accessToken ? jwtDecode(accessToken) : null;
  console.log("Decoded User Info:", decodedUserInfo);

  const [fullName, setFullName] = useState(decodedUserInfo?.fullName || "");
  const [email, setEmail] = useState(decodedUserInfo?.email || "");
  const [username, setUsername] = useState(decodedUserInfo?.username || "");
  const [image, setImage] = useState(decodedUserInfo?.image || "");
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const fileInputRef = useRef(null);


  const dispatch = useDispatch();

  const saveChanges = async () => {
    try {
      const response = await axios.patch(
        "/api/v1/users/update-account",
        { fullName, username },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data) {
        dispatch(logout());
        console.log("Profile Updated Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Error in Updating Profile: ", error);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
  
      try {
        const response = await axios.post("/api/v1/users/avatar", formData, { withCredentials: true });
  
        if (response.status === 200 && response.data) {
          dispatch(login({ userData: response.data }));
          console.log("Image Updated Successfully");
        }
  
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result); // This updates local state
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.log("Error updating profile image:", error);
      }
    }
  };
  

  const handleImageDelete = async (e) => {};

  return (
    <div className="bg-black flex h-[100vh] items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <Link to="/chat">
          <div>
            <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
          </div>
        </Link>
        <div
          className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
            {image ? (
              <AvatarImage
                src={image}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                  selectedColor
                )}`}
              >
                {fullName
                  ? fullName.split("").shift()
                  : email.split("").shift()}
              </div>
            )}
          </Avatar>
          {hovered && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
              onClick={image ? handleImageDelete : handleFileInputClick}
            >
              {image ? (
                <FaTrash className="text-white text-3xl cursor-pointer" />
              ) : (
                <FaPlus className="text-white text-3xl cursor-pointer" />
              )}
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
            name="profile-image"
            accept=".png, .jpg, .jpeg, .svg, .webp"
          />
        </div>
        <div className="flex min-w-32 flex-col gap-5 text-white items-center justify-center">
          <div className="w-full">
            <Input
              placeholder="Email"
              type="email"
              disabled
              value={email}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="FullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
            />
          </div>
          <div className="w-full flex gap-5">
            {colors.map((color, index) => (
              <div
                className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                  selectedColor === index
                    ? "outline outline-white/50 outline-3"
                    : ""
                }`}
                key={index}
                onClick={() => setSelectedColor(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <Link to="/chat">
          <Button onClick={saveChanges}>Save Changes</Button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
