import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { closeIcon, mediaIcon, penIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import PhoneInput from "react-phone-input-2";
import { useRef, useState } from "react";
import { showToast } from "../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux-toolkit/userDetailSlice";
import { concatImgURL } from "../../config/function";

type EditAccountType = {
  show: boolean;
  onClose: () => void;
};
type UserData = {
  firstName: string | null;
  lastName: string | null;
  profile_img: string | null;
  username: string | null;
  mobileNo: string | null;
  status: string | null;
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

const EditAccount = ({ show, onClose }: EditAccountType) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    profile_img: "",
    username: "",
    mobileNo: "",
    status: "",
    email: "",
    role: {
      id: 1,
      code: "Manager",
      translations: [],
    },
    language: "English",
  });
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
  const updateUserProfile = (formData: FormData) => {
    return api.put("/user/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      dispatch(setUserDetails(data.data));
      showToast("Profile updated successfully!", "success");
      navigate("/account");
    },
    onError: () => {
      showToast("Failed to update profile", "error");
    },
  });
  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("first_name", userData.firstName || "");
    formData.append("last_name", userData.lastName || "");
    formData.append("phone_number", userData.mobileNo || "");
    formData.append("email", userData.email || "");
    formData.append("status", userData.status || "");
    formData.append("username", userData.username || "");
    formData.append(
      "role_id",
      userData.role?.id != null ? String(userData.role.id) : ""
    );
    formData.append("language_code", userData.language || "");
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    updateProfileMutation.mutate(formData);
  };
  return (
    <div>
      <Dialog
        open={show}
        onClose={() => {}}
        transition
        className="fixed inset-0 z-[500] flex items-center justify-center transition duration-300 ease-out data-closed:opacity-0"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />
        <DialogPanel className="w-max relative z-10 bg-white rounded-2xl  border border-primary">
          <div className="flex items-center justify-between mb-6 px-9 pt-9">
            <DialogTitle as="h2" className="text-2xl/6 font-extrabold">
              Account Settings
            </DialogTitle>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="p-0"
              onClick={onClose}
            />
          </div>
          <hr />
          <div className="md:flex md:justify-start justify-center  gap-4 md:p-9 p-2">
            <div className="md:block flex items-center justify-center md:mb-0 mb-4  ">
              <div className="md:w-sp170 w-sp100 md:h-sp170 h-sp100 relative  mb-3 md:mb-0">
                <img
                  src={
                    userData?.profile_img
                      ? concatImgURL(userData.profile_img)
                      : mediaIcon
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
            </div>
            <div className="grid md:grid-cols-2  grid-cols-2  gap-4 md:gap-6">
              <div>
                <div>
                  <Input label="Frist Name" placeholder="Enter Email Address" />
                </div>
                <div className="my-2">
                  <div>
                    <label className="block md:text-base/4 text-base md:mb-2 mb-0 font-medium">
                      Mobile Number
                    </label>
                    <PhoneInput
                      country={"in"} // default country as per screenshot
                      // value={userData.mobileNo || ""}
                      // onChange={handlePhoneChange}
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
                </div>
                <div className="my-2">
                  <Input label="User Name" placeholder="Enter Email Address" />
                </div>
                <div>
                  <label className="block md:mb-2 mb-0 font-medium md:text-base/4 text-sm">
                    Status
                  </label>
                  <select
                    name="role"
                    // value={userData?.role?.id || ""}
                    // onChange={handleChange}
                    className="w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl rounded-lg md:pr-10 bg-transparent"
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {/* {allRoles.map((role: any) => {
                      // const translation = role.translations?.find(
                      //   (t: any) => t.language_code === "en"
                      // );
                      return (
                        <option key={role.id} value={role.id}>
                          {role.code}
                        </option>
                      );
                    })} */}
                  </select>
                </div>
                <div className="my-2">
                  <Input
                    label="New Password"
                    placeholder="Enter Password"
                    type="password"
                  />
                </div>
              </div>
              <div>
                <div>
                  <Input label="Last Name" placeholder="Enter Email Address" />
                </div>
                <div className="my-2">
                  <Input label="Email" placeholder="Enter Email Address" />
                </div>
                <div>
                  <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                    Language
                  </label>
                  <select
                    name="role"
                    // value={userData?.role?.id || ""}
                    // onChange={handleChange}
                    className="w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl rounded-lg md:pr-10 bg-transparent"
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {/* {allRoles.map((role: any) => {
                      // const translation = role.translations?.find(
                      //   (t: any) => t.language_code === "en"
                      // );
                      return (
                        <option key={role.id} value={role.id}>
                          {role.code}
                        </option>
                      );
                    })} */}
                  </select>
                </div>
                <div className="my-2">
                  <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                    Select Role
                  </label>
                  <select
                    name="role"
                    // value={userData?.role?.id || ""}
                    // onChange={handleChange}
                    className="w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl rounded-lg md:pr-10 bg-transparent"
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {/* {allRoles.map((role: any) => {
                      // const translation = role.translations?.find(
                      //   (t: any) => t.language_code === "en"
                      // );
                      return (
                        <option key={role.id} value={role.id}>
                          {role.code}
                        </option>
                      );
                    })} */}
                  </select>
                </div>
                <div>
                  <Input
                    label="Confirm Passeord"
                    placeholder="Enter Password"
                    type="password"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center border-t md:px-9 px-2 md:py-8 py-4 gap-4">
            <Button
              text="Cancel"
              onClick={onClose}
              className="px-5 border-primary border-0.5"
              backgroundColor="transparent"
            />
            <Button text="Save" className="px-8 py-3" onClick={handleUpdate} />
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default EditAccount;
