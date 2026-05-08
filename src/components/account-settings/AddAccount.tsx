import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  closeIcon,
  eyeCloseIcon,
  eyeOpenIcon,
  mediaIcon,
  penIcon,
} from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
// import PhoneInput from "react-phone-input-2";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import api from "../../lib/api";
import { concatImgURL } from "../../config/function";
import AsyncSelect from "react-select/async";
import { customStyles } from "./CreateCategories";
import type { MultiValue } from "react-select";
import type { AxiosError } from "axios";
import {
  selectUser,
  setUserDetails,
} from "../../redux-toolkit/userDetailSlice";
import { useDispatch, useSelector } from "react-redux";
type AddAccountType = {
  show: boolean;
  onClose: () => void;
  initialData?: any;
};
type TournamentOption = {
  value: number;
  label: string;
};

export type UserData = {
  firstName: string;
  lastName: string;
  profile_img: string;
  username: string;
  mobileNo: string;
  status: number;
  email: string;
  password: string;
  confirm_password: string;
  roles: {
    id: number;
    code: string;
  }[];
  language: string;
  staff_type: string;
  tournament_ids: number[];
  email_request: string;
};

const AddAccount = ({ show, onClose, initialData }: AddAccountType) => {
  const initialState = {
    firstName: "",
    lastName: "",
    profile_img: "",
    username: "",
    mobileNo: "",
    password: "",
    confirm_password: "",
    status: 1,
    email: "",
    roles: [],
    language: "en",
    staff_type: "padel",
    tournament_ids: [] as number[],
    email_request: "no",
  };
  const isEdit = Boolean(initialData?.id);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<UserData>(initialState);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const userDetails = useSelector(selectUser);
  const [allRoles, setAllRoles] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowPConfirmPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedTournament, setSelectedTournament] = useState<
    TournamentOption[]
  >([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const userId = initialData?.id || null;
  const generatedUsername = `${userData.firstName}${userData.lastName}`
    .toLowerCase()
    .replace(/\s+/g, "");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handlePhoneChange = (value: string) => {
  //   setUserData((prev) => ({
  //     ...prev,
  //     mobileNo: value,
  //   }));
  // };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;

    // First Name
    if (!userData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z]{2,}$/.test(userData.firstName)) {
      newErrors.firstName = "Enter a valid first name";
    }

    // Last Name
    if (!userData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]{2,}$/.test(userData.lastName)) {
      newErrors.lastName = "Enter a valid last name";
    }

    // Email
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isEmailValid) {
      newErrors.email = "Enter a valid email";
    }

    // Username
    // if (!userData.username.trim()) {
    //   newErrors.username = "Username is required";
    // } else if (!/^[a-zA-Z0-9_]{4,}$/.test(userData.username)) {
    //   newErrors.username =
    //     "Username must be 4+ chars & contain only letters, numbers";
    // }

    // Phone
    // if (!userData.mobileNo) {
    //   newErrors.mobileNo = "Mobile number is required";
    // } else if (userData.mobileNo.replace(/\D/g, "").length < 10) {
    //   newErrors.mobileNo = "Enter a valid mobile number";
    // }

    // Language
    if (!userData.language) {
      newErrors.language = "Language is required";
    }

    // Roles
    if (!userData.roles.length) {
      newErrors.roles = "At least one role is required";
    }

    // Password (Create only)
    if (!isEdit) {
      if (!userData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (!strongPasswordRegex.test(userData.password)) {
        newErrors.password =
          "Password must be 8+ chars with upper, lower, number & special char";
      }

      if (!userData.confirm_password) {
        newErrors.confirm_password = "Confirm password is required";
      } else if (userData.password !== userData.confirm_password) {
        newErrors.confirm_password = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //role
  const roleOptions = useMemo(
    () =>
      allRoles?.map((role: any) => ({
        value: role.id,
        label: role.code,
      })) || [],
    [allRoles],
  );

  const loadRoleOptions = async (input: string) => {
    const res = await api.get("/roles", {
      params: {
        limit: 50,
        search: input || "",
      },
    });

    return res.data.roles?.map((role: any) => ({
      value: role.id,
      label: role.code,
    }));
  };
  const selectedRoles = useMemo(
    () =>
      userData.roles.map((r: any) => ({
        value: r.id,
        label: r.code,
      })),
    [userData.roles],
  );
  const handleRoleChange = (selected: any) => {
    setUserData((prev) => ({
      ...prev,
      roles:
        selected?.map((r: any) => ({
          id: r.value,
          code: r.label,
        })) || [],
    }));
  };
  const handleTournamentChange = (selected: MultiValue<TournamentOption>) => {
    const selectedArray = [...selected]; // ✅ readonly → mutable

    setSelectedTournament(selectedArray);

    setUserData((prev) => {
      return {
        ...prev,
        tournament_ids: selectedArray?.map((t) => Number(t.value)),
      };
    });
  };

  const getAllTournaments = async () => {
    const res = await api.get("/tournament/getDropdown");
    return res.data;
  };

  const { data: allTournaments = [] } = useQuery({
    queryKey: ["tournaments"],
    queryFn: getAllTournaments,
    refetchOnWindowFocus: false,
  });

  const tournamentOptions = useMemo(
    () =>
      allTournaments.map((item: any) => ({
        value: item.id,
        label: item.name,
      })),
    [allTournaments],
  );

  const loadOptionsTournaments = (inputValue: string, callback: any) => {
    const filtered = tournamentOptions.filter((t: any) =>
      t.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
    callback(inputValue ? filtered : tournamentOptions.slice(0, 50));
  };

  const getUserRoles = async () => {
    const res = await api.get("/roles", {
      params: {
        limit: 50,
      },
    });
    return res.data;
  };

  const { data: userRoles } = useQuery({
    queryKey: ["userRoles"],
    queryFn: getUserRoles,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (userRoles?.roles) {
      setAllRoles(userRoles?.roles || []);
    }
  }, [userRoles]);
  // useEffect(() => {
  //   if (userData.staff_type === "other") {
  //     setSelectedTournament([]);
  //     setUserData((prev) => ({
  //       ...prev,
  //       tournament_ids: [],
  //     }));
  //   }
  // }, [userData.staff_type]);

  const uploadFile = async (file: File | string) => {
    const formData = new FormData();
    formData.append("file", file);
    return await api.post(`/articles/upload/other`, formData);
  };

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onMutate: () => {
      setIsUploading(true);
    },
    onSuccess: (data) => {
      const imgUrl = data?.data?.[0].url;
      if (imgUrl) {
        setUserData((prev) => ({ ...prev, profile_img: imgUrl }));
      }
    },
    onError: (err) => {
      console.error("Upload failed", err);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  const updateUserProfile = ({
    id,
    ...data
  }: {
    id: number;
    [key: string]: any;
  }) => {
    return api.put(`/admin/${id}`, data);
  };

  const createAccount = async (payload: any) => {
    return await api.post("/admin", payload);
  };

  const createAccountMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: (data) => {
      showToast("User Created", "success");

      if (data?.data?.id === userDetails.id) {
        dispatch(setUserDetails(data.data));
      }
      // dispatch(setUserDetails(data.data));

      queryClient.invalidateQueries({
        queryKey: ["allAccounts"],
        exact: false,
      });
      onClose();
    },
    onError: (error: AxiosError<any>) => {
      const message = error.response?.data?.message ?? "Failed to create user";

      showToast(message, "error");
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      if (data?.data?.id === userDetails.id) {
        dispatch(setUserDetails(data.data));
      }
      showToast("User updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["allAccounts"] });
      onClose();
    },
    onError: () => {
      showToast("Failed to update user", "error");
    },
  });

  const handleUpdate = () => {
    if (!validateForm()) {
      showToast("Please fix the errors", "error");
      return;
    }
    const cleanedImage = userData.profile_img.replace(
      "https://ip-cms-api.ypstagingserver.com",
      "",
    );

    const payload: Record<string, any> = {
      username: generatedUsername,
      email: userData.email || "",
      first_name: userData.firstName || "",
      last_name: userData.lastName || "",
      image: cleanedImage || "",
      role_ids: userData.roles.map((r) => r.id),
      status: userData.status || "",
      language_code: userData.language || "",
      phone_number: userData.mobileNo || "",
      staff_type: userData.staff_type,
      tournament_ids: userData.tournament_ids,
      email_request: userData.email_request,
    };

    if (!isEdit) {
      payload.password = userData.password || "";
    }

    if (isEdit && userId) {
      updateProfileMutation.mutate({ id: userId, ...payload });
    } else {
      createAccountMutation.mutate(payload);
    }
  };

  useEffect(() => {
    if (isEdit && initialData) {
      setUserData({
        firstName: initialData.first_name || "",
        lastName: initialData.last_name || "",
        profile_img: initialData.image || "",
        username: initialData.username || "",
        mobileNo: initialData.phone_number || "",
        password: initialData.password,
        confirm_password: initialData.confirm_password,
        status: initialData.status ?? 1,
        email: initialData.email || "",
        roles:
          initialData.roles?.map((r: any) => ({
            id: r.id,
            code: r.code,
            translations: r.role?.translations || [],
          })) || [],
        language: initialData.language || "en",
        staff_type: initialData.staff_type || "",
        tournament_ids: initialData.tournament_ids || [],
        email_request: initialData.email_request || "no",
      });
      if (initialData?.tournament_ids?.length && allTournaments.length) {
        const selected = allTournaments
          .filter((t: any) => initialData.tournament_ids.includes(t.id))
          .map((t: any) => ({
            value: t.id,
            label: t.name,
          }));

        setSelectedTournament(selected);

        setUserData((prev) => ({
          ...prev,
          tournament_ids: selected.map((t: any) => t.value),
        }));
      }
    } else {
      setUserData(initialState);
    }
  }, [initialData, isEdit, show]);

  return (
    <div>
      <Dialog
        open={show}
        onClose={() => {}}
        transition
        className="fixed inset-0 z-[500] flex items-center justify-center transition duration-300 ease-out data-closed:opacity-0"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />
        <DialogPanel className="max-w-full   w-[900px] relative z-10 bg-white rounded-2xl   border border-primary">
          <div className="flex items-center justify-between mb-6 px-9 pt-9">
            <DialogTitle
              as="h2"
              className="text-2xl/6 font-extrabold capitalize"
            >
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
              <div className="md:w-32 w-sp100 md:h-32 flex items-center justify-center h-sp100 relative rounded-full border mb-3 md:mb-0">
                {isUploading ? (
                  <div className="rounded-full absolute inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
                      <p className="text-white text-sm mt-2">Uploading...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {userData.profile_img ? (
                      <img
                        src={concatImgURL(userData.profile_img)}
                        alt="Profile Img"
                        className="w-full h-full rounded-full object-cover "
                      />
                    ) : (
                      <img
                        src={mediaIcon}
                        alt="Profile Img"
                        className="w-12 h-12 rounded-full object-cover "
                      />
                    )}
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
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-4 h-max overflow-y-auto scroll-hide w-full">
              {/* 1. First Name */}
              <div>
                <Input
                  id="fname"
                  label="First Name"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={userData.firstName ?? ""}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* 2. Last Name */}
              <div>
                <Input
                  id="lname"
                  name="lastName"
                  value={userData.lastName ?? ""}
                  onChange={handleChange}
                  label="Last Name"
                  placeholder="Enter Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* 3. Mobile Number */}
              {/* <div>
                <label className="block md:text-base/4 text-base md:mb-2 mb-0 font-medium">
                  Mobile Number
                </label>
                <PhoneInput
                  enableSearch
                  country={"in"}
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
                    paddingLeft: "48px",
                    backgroundColor: "#f9f9f9",
                  }}
                  buttonStyle={{
                    border: "1px solid #acacac",
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    backgroundColor: "#f9f9f9",
                    borderRight: "1px solid #acacac",
                  }}
                  containerStyle={{ width: "100%" }}
                  dropdownStyle={{ zIndex: 9999 }}
                />
                {errors.mobileNo && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
                )}
              </div> */}

              {/* 4. Email */}
              <div>
                <Input
                  id="email"
                  name="email"
                  value={userData.email ?? ""}
                  onChange={handleChange}
                  label="Email"
                  placeholder="Enter Email Address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* 5. Username */}
              <div className="hidden">
                <Input
                  id="uname"
                  type="text"
                  name="username"
                  value={userData.username ?? ""}
                  onChange={handleChange}
                  label="User Name"
                  placeholder="Enter Username"
                  autoComplete="new-Username"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              {/* 6. Language */}
              <div>
                <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                  Language
                </label>
                <select
                  name="language"
                  value={userData.language ?? ""}
                  onChange={handleChange}
                  className="w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl rounded-lg md:pr-10 bg-transparent"
                >
                  <option value="" disabled>
                    Select Language
                  </option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                </select>
              </div>

              {/* 7. Role */}
              {!isEdit && (
                <>
                  {/* 8. New Password */}
                  <div>
                    <div className="relative">
                      <Input
                        id="pass"
                        name="password"
                        value={userData.password ?? ""}
                        onChange={handleChange}
                        label="New Password"
                        placeholder={
                          isEdit
                            ? "Password cannot be changed"
                            : "Enter Password"
                        }
                        type={showPass ? "text" : "password"}
                        disabled={isEdit}
                        autoComplete="new-Password"
                      />

                      {!isEdit && (
                        <img
                          src={showPass ? eyeCloseIcon : eyeOpenIcon}
                          className="w-6 h-6 absolute right-3 opacity-40 bottom-2.5 cursor-pointer"
                          onClick={() => setShowPass(!showPass)}
                        />
                      )}
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  {/* 9. Confirm Password */}
                  <div>
                    <div className="relative">
                      <Input
                        id="cpass"
                        name="confirm_password"
                        value={userData.confirm_password ?? ""}
                        onChange={handleChange}
                        label="Confirm Password"
                        placeholder={
                          isEdit
                            ? "Password cannot be changed"
                            : "Enter Password"
                        }
                        disabled={isEdit}
                        type={showConfirmPass ? "text" : "password"}
                        autoComplete="new-Password"
                      />
                      <img
                        src={showConfirmPass ? eyeCloseIcon : eyeOpenIcon}
                        alt="Eye-icon"
                        className="w-6 h-6 absolute right-3 opacity-40 bottom-2.5 cursor-pointer"
                        onClick={() => setShowPConfirmPass(!showConfirmPass)}
                      />
                    </div>
                    {errors.confirm_password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.confirm_password}
                      </p>
                    )}
                  </div>
                </>
              )}
              <div className="col-span-2">
                <div className="max-w-full">
                  <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                    Select Role
                  </label>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadRoleOptions}
                    defaultOptions={roleOptions}
                    isMulti
                    styles={{
                      ...customStyles,
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    placeholder="Select roles"
                    value={selectedRoles}
                    onChange={handleRoleChange}
                  />
                  {errors.roles && (
                    <p className="text-red-500 text-xs mt-1">{errors.roles}</p>
                  )}
                </div>
              </div>
              {/* 6. Language */}
              <div>
                <label className="block  font-medium md:text-base/4 text-sm  mb-1">
                  Staff Type
                </label>
                <select
                  name="staff_type"
                  value={userData.staff_type}
                  onChange={handleChange}
                  className="w-full p-2.5 md:text-base text-sm border-0.5 border-primary md:rounded-xl rounded-lg md:pr-10 bg-transparent"
                >
                  <option value="padel">Premier Padel Staff</option>
                  <option value="other">Other Staff</option>
                </select>
              </div>

              <div>
                <label className="block  font-medium  md:text-base/4 text-sm mb-1">
                  Receive Email Request
                </label>

                <select
                  name="email_request"
                  value={userData.email_request}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-primary rounded-xl bg-transparent"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              {userData.staff_type === "other" && (
                <div className="col-span-2">
                  <label className="block  font-medium md:text-base/4 text-sm  mb-1">
                    Tournament
                  </label>

                  <AsyncSelect
                    isMulti
                    cacheOptions
                    // styles={customStyles}
                    styles={{
                      ...customStyles,
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    menuPlacement="top"
                    menuPosition="fixed"
                    menuShouldScrollIntoView={true}
                    loadOptions={loadOptionsTournaments}
                    defaultOptions={tournamentOptions.slice(0, 50)}
                    placeholder="Select Tournament"
                    value={selectedTournament}
                    onChange={handleTournamentChange}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center border-t md:px-9 px-2 md:py-8 py-4 gap-4">
            <Button
              text="Cancel"
              onClick={onClose}
              className="px-5 py-3 border-primary border-0.5"
              backgroundColor="transparent"
            />
            <Button
              text={`${
                createAccountMutation.isPending ||
                updateProfileMutation.isPending
                  ? "Saving"
                  : "Save"
              }`}
              className={` px-8 py-3`}
              onClick={handleUpdate}
            />
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default AddAccount;
