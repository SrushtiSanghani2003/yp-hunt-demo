import AuthLayout from "../components/layouts/AuthLayout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { eyeCloseIcon, eyeOpenIcon } from "../icons";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { useDispatch } from "react-redux";
import { showToast } from "../utils/toastUtils";
import { setToken } from "../redux-toolkit/tempTokenSlice";

// ✅ Zod validation schema
const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof schema>;

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token"); // ✅ get token from query params
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Mutation to call API
  const resetMutation = useMutation({
    mutationFn: async (credentials: FormData) => {
      try {
        const payload = {
          password: credentials.password,
          token,
        };

        const response = await api.post("/admin/reset-password", payload);
        return response.data;
      } catch (error: any) {
        const message =
          error.response?.data?.message || error.message || "Reset failed.";
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      dispatch(setToken(data.temp_token));
      showToast("Password reset successfully", "success");
      navigate("/auth/login"); // ✅ keep this commented if you don't want redirect
    },
    onError: (error) => {
      console.error("Reset error:", error.message);
      showToast(error.message, "error"); // ✅ this now shows your toast
    },
  });

  const onSubmit = (data: FormData) => {
    resetMutation.mutate(data);
  };

  return (
    <AuthLayout contentWidth="md:max-w-sp387">
      <form onSubmit={handleSubmit(onSubmit)} className="lg:w-sp387 w-full">
        <div className="md:mb-sp42">
          <h2 className="font-bold md:text-40 text-2xl leading-60 uppercase md:mb-12 mb-0">
            Reset Password
          </h2>

          {/* ✅ New Password Field */}
          <div className="relative mb-sp18">
            <input
              {...register("password")}
              type={showPass ? "text" : "password"}
              placeholder="New password"
              className="w-full bg-white md:p-5 p-3 rounded-2xl border border-gray-300"
            />
            <img
              src={showPass ? eyeCloseIcon : eyeOpenIcon}
              alt="Eye-icon"
              className="w-6 h-6 absolute right-4 opacity-40 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
            {errors.password && (
              <div className="absolute -top-4 left-0 mt-1 bg-red-500 text-white text-sm px-3 py-1 rounded-md shadow z-10">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* ✅ Confirm Password Field */}
          <div className="relative mb-sp18">
            <input
              {...register("confirmPassword")}
              type={showPass ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full bg-white md:p-5 p-3 rounded-2xl border border-gray-300"
            />
            <img
              src={showPass ? eyeCloseIcon : eyeOpenIcon}
              alt="Eye-icon"
              className="w-6 h-6 absolute right-4 opacity-40 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
            {errors.confirmPassword && (
              <div className="absolute -top-4 left-0 mt-1 bg-red-500 text-white text-sm px-3 py-1 rounded-md shadow z-10">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={resetMutation.isPending}
          className="bg-primary text-black md:py-sp18 py-3 w-full text-center text-lg rounded-2xl font-bold md:mb-sp38 mb-4"
          style={{
            cursor: resetMutation.isPending ? "not-allowed" : "cursor",
          }}
        >
          {resetMutation.isPending ? "Resetting..." : "Reset Password"}
        </button>

        {resetMutation.error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {resetMutation.error.message || "Reset failed. Try again."}
          </p>
        )}

      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
