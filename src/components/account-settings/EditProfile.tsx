import { useDispatch, useSelector } from "react-redux";
import { penIcon, userImage } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import { useNavigate } from "react-router-dom";
import {
  selectUser,
  setUserDetails,
} from "../../redux-toolkit/userDetailSlice";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import PhoneInput from "react-phone-input-2";
import { concatImgURL } from "../../config/function";

type UserData = {
  firstName: string | null;
  lastName: string | null;
  profile_img: string | null;
  username: string | null;
  mobileNo: string | null;
  email: string | null;
  role: {
    id: number;
    code: string;
    translations: {
      language_code: string;
      name: string;
      description: string;
    }[];
  } | null;
  language: string | null;
};

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userDetails = useSelector(selectUser);
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    profile_img: "",
    username: "",
    mobileNo: "",
    email: "",
    role: {
      id: 1,
      code: "Manager",
      translations: [],
    },
    language: "English",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [allRoles, setAllRoles] = useState([]);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "role") {
      const selectedRole = allRoles?.find(
        (role: any) => role.id === Number(value),
      );
      if (selectedRole) {
        setUserData((prev) => ({
          ...prev,
          role: selectedRole,
        }));
      }
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setUserData((prev) => ({
      ...prev,
      mobileNo: value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set preview image url
      const localUrl = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, profile_img: localUrl }));

      // Store the actual file for upload later
      setSelectedFile(file);
    }
  };

  const getUserRoles = async () => {
    const res = await api.get("/roles");
    return res.data;
  };

  const { data: userRoles } = useQuery({
    queryKey: ["userRoles"],
    queryFn: getUserRoles,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (userRoles) {
      setAllRoles(userRoles?.roles);
    }
  }, [userRoles]);

  useEffect(() => {}, [userData]);

  const updateUserProfile = (formData: FormData) => {
    return api.put("/user/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      dispatch(setUserDetails(data.data));
      showToast("Profile updated successfully!", "success");
      navigate("/account");
    },
    onError: (error: any) => {
      setLoading(false);
      showToast(
        error?.response?.data?.message || "Something went wrong!",
        "error",
      );
    },
  });

  useEffect(() => {
    if (userDetails) {
      setUserData({
        ...userData,
        firstName: userDetails.first_name,
        lastName: userDetails.last_name,
        profile_img: userDetails.image,
        username: userDetails.username,
        mobileNo: userDetails.phone_number,
        email: userDetails.email,
        role: userDetails.role,
        language: userDetails.language_code,
      });
    }
  }, [userDetails]);

  const handleCancel = () => {
    navigate("/account");
  };

  const handleUpdate = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("first_name", userData.firstName || "");
    formData.append("last_name", userData.lastName || "");
    formData.append("phone_number", userData.mobileNo || "");
    formData.append("email", userData.email || "");
    formData.append("username", userData.username || "");
    // formData.append(
    //   "role_id",
    //   userData.role?.id != null ? String(userData.role.id) : ""
    // );
    // formData.append("language_code", userData.language || "");
    formData.append("language_code", "en");
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    updateProfileMutation.mutate(formData);
  };

  return (
    <div className="container">
      <div className="lg:flex items-start justify-between md:mb-10 ">
        <div className=" w-full ">
          <div className="md:pb-10 pb-5 border-b-ced6de border-b">
            <div className="lg:flex lg:gap-10 gap-5 items-start lg:mb-7 mb-3 pt-4">
              <div className="md:w-sp170 w-sp100 md:h-sp170 h-sp100 relative  mb-3 md:mb-0">
                <img
                  src={
                    userData.profile_img
                      ? concatImgURL(userData.profile_img)
                      : userImage
                  }
                  alt="Profile Img"
                  className="w-full h-full rounded-full object-cover"
                />
                <Button
                  icon={penIcon}
                  className="p-2 rounded-full absolute bottom-0 right-3"
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1 ">
                <Input
                  label="First Name"
                  name="firstName"
                  value={userData.firstName || ""}
                  onChange={handleChange}
                  labelCss=" text-base bg-transparent  font-medium"
                  bgColor="transparent"
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={userData.lastName || ""}
                  onChange={handleChange}
                  bgColor="transparent"
                  labelCss=" text-base  font-medium"
                />
                {/* <div>
                  <label className="block md:text-base/4 text-base md:mb-2 mb-1 font-medium">
                    Mobile No
                  </label>
                  <div className="flex  w-full ">
                    <div className="flex h-min w-full border-0.5 border-primary md:rounded-xl rounded-lg">
                      <select
                        name="countryCode"
                        onChange={handleChange}
                        className="p-2 md:text-base text-sm bg-transparent outline-none"
                      >
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+91">+91</option>
                      </select>
                      <input
                        type="number"
                        value={userData.mobileNo || ""}
                        onChange={handleChange}
                        className="w-full p-2 md:text-base text-sm border-l-1 md:pr-10 bg-transparent"
                        placeholder="Enter Your Mobile Number"
                      />
                    </div>
                  </div>
                </div> */}
                <div>
                  <label className="block md:text-base/4 text-base md:mb-2 mb-1 font-medium">
                    Mobile No
                  </label>
                  <PhoneInput
                    country={"in"} // default country as per screenshot
                    value={userData.mobileNo || ""}
                    onChange={handlePhoneChange}
                    countryCodeEditable={false}
                    placeholder="Phone Number"
                    inputStyle={{
                      width: "100%",
                      border: "1px solid #acacac",
                      borderRadius: "12px",
                      height: "40px",
                      fontSize: "14px",
                      paddingLeft: "48px", // make room for flag
                      backgroundColor: "#f9f9f9", // match screenshot's white/gray tone
                    }}
                    buttonStyle={{
                      border: "1px solid #acacac",
                      borderLeft: "1px solid #acacac !important",
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      backgroundColor: "#f9f9f9",
                      borderRight: "1px solid #acacac",
                    }}
                    containerStyle={{ width: "100%" }}
                    dropdownStyle={{
                      zIndex: 9999,
                    }}
                  />
                </div>
                <Input
                  label="Email"
                  name="email"
                  readOnly
                  placeholder="example@gmail.com"
                  value={userData.email || ""}
                  onChange={handleChange}
                  bgColor="transparent"
                  labelCss=" text-basefont-medium"
                />
                <Input
                  label="User Name"
                  name="username"
                  value={userData.username || ""}
                  onChange={handleChange}
                  bgColor="transparent"
                  labelCss="text-base font-medium"
                />
                <div className="opacity-0 invisible grid grid-cols-2 md:gap-5 gap-1">
                  <div>
                    <label className="block  text-base md:mb-2 mb-1 font-medium">
                      Role
                    </label>
                    <select
                      name="role"
                      value={userData?.role?.id || ""}
                      onChange={handleChange}
                      className="w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl rounded-lg md:pr-10 bg-transparent"
                    >
                      <option value="" disabled>
                        Select role
                      </option>
                      {allRoles?.map((role: any) => {
                        // const translation = role.translations?.find(
                        //   (t: any) => t.language_code === "en"
                        // );
                        return (
                          <option key={role.id} value={role.id}>
                            {role.code}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label className="block  text-base md:mb-2 mb-1 font-medium">
                      Language
                    </label>
                    <select
                      name="language"
                      value={userData?.language || ""}
                      onChange={handleChange}
                      className="w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl rounded-lg md:pr-10 bg-transparent"
                    >
                      <option value="en">English</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-start gap-4 pt-2">
                    <Button
                      text="Save"
                      className=" w-28  md:py-3 md:rounded-xl border-primary font-medium border-0.5"
                      onClick={handleUpdate}
                      isLoading={loading}
                    />
                    <Button
                      text="Cancel"
                      className=" w-28 md:py-3 md:rounded-xl border-primary font-medium border-0.5"
                      backgroundColor="transparent"
                      onClick={handleCancel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
