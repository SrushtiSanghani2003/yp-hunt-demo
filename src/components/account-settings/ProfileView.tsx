import { useNavigate } from "react-router-dom";
import Button from "../ui/button";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux-toolkit/userDetailSlice";
import { useEffect, useState } from "react";
import Input from "../ui/input/Input";
import { useMutation } from "@tanstack/react-query";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { concatImgURL } from "../../config/function";
import { selectAdministrationPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionAdministrationFlags } from "../sidebar/menuPermissions";
import { userImage } from "../../icons";

const ProfileView = () => {
  const navigate = useNavigate();
  const [changePass, setChangePass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userDetails = useSelector(selectUser);
  const menuPermissions = useSelector(selectAdministrationPermissions);
  const { isChangePassword, isUpdate } = getPermissionAdministrationFlags(
    menuPermissions.profile_settings,
  ); 

  useEffect(() => {
    if (userDetails) {
    }
  }, [userDetails]);

  const [password, setPassword] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    if (!isUpdate) return;
    navigate("/account/edit");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const obj = {
        old_password: password.old,
        password: password.new,
        confirm_password: password.confirm,
      };
      const response = await api.put("/auth/change-password", obj);
      return response.data;
    },
    onSuccess: () => {
      showToast("Password changed successfully!", "success");
      setPassword({ old: "", new: "", confirm: "" });
      setChangePass(false);
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message || "";
      if (message.toLowerCase().includes("wrong old password!")) {
        setErrorMessage(message);
      } else {
        setErrorMessage("");
      }
    },
  });

  const handleChangePass = () => {
    if (!password.old || !password.new || !password.confirm) {
      showToast("Please fill all fields.", "error");
      return;
    }
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;
    if (!strongPasswordRegex.test(password.new)) {
      showToast(
        "Password must include uppercase, lowercase, number, and special character.",
        "error",
      );
      return;
    }

    if (password.new !== password.confirm) {
      showToast("New password and confirm password do not match.", "error");
      return;
    }

    mutate();
  };

  const maskEmail = (email: string) => {
    if (email) {
      const [username, domain] = email.split("@");
      const maskedUsername = username.slice(0, 5) + "*".repeat(5);
      return `${maskedUsername}@${domain}`;
    }
  };

  return (
    <div className="container">
      <div className=" relative px-0 py-6 sm:px-6 lg:px-2">
        <div className="md:flex flex-col lg:flex-row items-start gap-6 sm:gap-10 pb-8 border-b border-primary">
          <div className="flex lg:block pb-10 md:pb-0 justify-between w-full lg:w-max">
            <PhotoProvider maskOpacity={0.6}>
              <PhotoView src={concatImgURL(userDetails.image) || userImage}>
                <img
                  src={concatImgURL(userDetails.image) || userImage}
                  alt="Profile"
                  className="md:w-[10.25rem] w-[5rem] md:h-[8.5rem] h-[5rem] rounded-full object-cover cursor-pointer"
                />
              </PhotoView>
              <div className="block lg:hidden">
                <div className="flex justify-end">
                  <Button
                    text="Edit Profile"
                    backgroundColor="black"
                    className="text-white md:px-6 px-3 md:py-3 py-2 font-bold w-max  rounded-lg text-sm sm:text-base hover:bg-gray-800 transition-colors"
                    onClick={handleEdit}
                  />
                </div>
              </div>
            </PhotoProvider>
          </div>

          <div className="w-full">
            {/* Grid for user details and Edit Profile button */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 items-start">
              {/* First Name */}
              <div>
                <p className="text-lg sm:text-xl font-bold text-black ">
                  First Name
                </p>
                <p className="text-base sm:text-lg text-gray-600">
                  {userDetails.first_name || "N/A"}
                </p>
              </div>

              {/* Last Name */}
              <div>
                <p className="text-lg sm:text-xl font-bold text-black ">
                  Last Name
                </p>
                <p className="text-base sm:text-lg text-gray-600">
                  {userDetails.last_name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-black ">
                  User Name
                </p>
                <p className="text-base sm:text-lg text-gray-600">
                  {userDetails.username || "N/A"}
                </p>
              </div>

              {/* Edit Profile Button - Spanning remaining columns on larger screens */}
              <div className=" lg:block hidden">
                <div className=" flex justify-end">
                  <Button
                    text="Edit Profile"
                    backgroundColor="black"
                    disabled={!isUpdate}
                    className={`text-white md:px-5 px-3 md:py-2 py-1   font-bold w-max  md:rounded-lg  text-sm sm:text-base hover:bg-gray-800 transition-colors ${
                      !isUpdate ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleEdit}
                  />
                </div>
              </div>

              <div>
                <p className=" text-base sm:text-lg  font-medium text-black">
                  Mobile No
                </p>
                <p className="text-base  text-gray-500 font-medium">
                  {userDetails.phone_number || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-base sm:text-lg font-medium text-black">
                  Email
                </p>
                <p className="test-base text-gray-500 font-medium break-words">
                  {maskEmail(userDetails.email) || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-base sm:text-lg font-medium text-black ">
                  Language
                </p>
                <p className="text-base  text-gray-500 font-medium break-words">
                  {userDetails.language || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-base sm:text-lg font-medium text-black ">
                  Role
                </p>

                {userDetails?.roles?.length === 1 ? (
                  <p className="text-base  text-gray-500 font-medium break-words">
                    {userDetails?.roles
                      ?.map((role: any) => role.code)
                      .join(", ")}
                  </p>
                ) : (
                  <p className="text-base  text-gray-500 font-medium break-words">
                    {userDetails?.roles?.map((role: any, index: number) =>
                      index === userDetails.roles.length - 1
                        ? role.code
                        : role.code + ", ",
                    )}
                  </p>
                )}
              </div>
              <div></div>
              {/* <div>
                <Input
                  name="new"
                  value={password.new}
                  onChange={handleChange}
                  placeholder="New Password"
                  bgColor="transparent"
                  className="m-0"
                />
              </div>
              <div>
                <Input
                  name="confirm"
                  value={password.confirm}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  bgColor="transparent"
                  className="m-0"
                />
              </div> */}
            </div>

            {/* <div className="mt-6">
              <p className="mb-4">Your password needs to include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Uppercase letters (A-Z)</li>
                <li>Lowercase letters (a-z)</li>
                <li>Numbers (0-9)</li>
                <li>Special characters (e.g., !, @, #, $, %)</li>
              </ul>
            </div>

            <div className="flex items-center md:justify-start justify-between md:gap-5 gap-3  md:mt-11 mt-6">
              <Button
                text={isPending ? "Submitting..." : "Submit"}
                className="md:px-7 px-5 md:py-3 py-3 font-bold"
                onClick={handleChangePass}
                disabled={isPending}
              />
              <Button
                text="Cancel"
                className="md:px-7 px-5 md:py-3  py-3 border-0.5 border-primary font-bold"
                backgroundColor="transparent"
                onClick={() => {
                  setChangePass(false);
                  setPassword({ old: "", new: "", confirm: "" });
                  setErrorMessage("");
                }}
              />
            </div> */}
          </div>
        </div>

        <div className="mt-5">
          {!changePass && (
            <Button
              text="Change Password"
              disabled={!isChangePassword}
              className={`md:px-8 md:text-base text-sm px-4 md:py-3 py-2 font-bold ${
                !isChangePassword ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (!isChangePassword) return;
                (setChangePass(true), setErrorMessage(""));
              }}
            />
          )}
          {changePass && (
            <div className="max-w-2xl">
              <h3 className="text-lg/5 md:mb-6 mb-3 font-bold">
                Change Password
              </h3>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5">
                <div className="col-span-1">
                  <Input
                    placeholder="Old Password"
                    name="old"
                    value={password.old}
                    onChange={handleChange}
                    bgColor="transparent"
                    className="m-0"
                  />
                  {errorMessage && (
                    <div className="text-red-500 font-medium mt-4">
                      {errorMessage}
                    </div>
                  )}
                </div>
                <div></div>
                <div>
                  <Input
                    name="new"
                    value={password.new}
                    onChange={handleChange}
                    placeholder="New Password"
                    bgColor="transparent"
                    className="m-0"
                  />
                </div>
                <div>
                  <Input
                    name="confirm"
                    value={password.confirm}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    bgColor="transparent"
                    className="m-0"
                  />
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-4">Your password needs to include:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Uppercase letters (A-Z)</li>
                  <li>Lowercase letters (a-z)</li>
                  <li>Numbers (0-9)</li>
                  <li>Special characters (e.g., !, @, #, $, %)</li>
                </ul>
              </div>

              <div className="flex items-center md:justify-start justify-between md:gap-5 gap-3  md:mt-11 mt-6">
                <Button
                  text={isPending ? "Submitting..." : "Submit"}
                  className="md:px-7 px-5 md:py-3 py-3 font-bold"
                  onClick={handleChangePass}
                  disabled={isPending}
                />
                <Button
                  text="Cancel"
                  className="md:px-7 px-5 md:py-3  py-3 border-0.5 border-primary font-bold"
                  backgroundColor="transparent"
                  onClick={() => setChangePass(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
