import AuthLayout from "../components/layouts/AuthLayout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../config/paths";
import { eyeCloseIcon, eyeOpenIcon } from "../icons";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { useDispatch } from "react-redux";
// import { setUserDetails } from "../redux-toolkit/userDetailSlice";
import { showToast } from "../utils/toastUtils";
import { setToken } from "../redux-toolkit/tempTokenSlice";
import { setUserDetails } from "../redux-toolkit/userDetailSlice";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;
interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginPayload) => {
      try {
        const response = await api.post("/auth/login", credentials);
        return response.data;
      } catch (error: any) {
        const message =
          error.response?.data?.message || error.message || "Login failed.";
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      console.log("🚀 ~ Login ~ data:", data)
      const { is_2FA_allowed } = data;
      // 🔐 If 2FA is ENABLED
      if (is_2FA_allowed) {
        dispatch(setToken(data.temp_token)); // temp token only
        showToast("Verification code sent", "success");
        navigate("/auth/verification");
      }
      else {
        // dispatch(setToken(data.access_token)); 
        dispatch(setUserDetails(data));
        showToast("Login successful", "success");
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <AuthLayout contentWidth="md:max-w-sp387">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:w-sp387 w-full">
          <div className="md:mb-sp42">
            <h2 className="font-bold md:text-40 text-2xl leading-60 uppercase md:mb-12 mb-0">
              Login
            </h2>
            <div className="relative mb-sp14">
              <input
                {...register("email")}
                type="email"
                placeholder="Enter email"
                className="w-full bg-white md:p-5 p-3 rounded-2xl border border-gray-300 "
              />
              {errors.email && (
                <div className="absolute -top-4 left-0 mt-1 bg-red-500 text-white text-sm px-3 py-1 rounded-md shadow z-10">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="relative mb-sp18">
              <input
                {...register("password")}
                type={`${showPass ? "text" : "password"}`}
                placeholder="Password"
                className="w-full bg-white md:p-5 p-3 rounded-2xl border border-gray-300"
              />
              {showPass ? (
                <img
                  src={eyeCloseIcon}
                  alt="Eye-icon"
                  className="w-6 h-6 absolute right-4 opacity-40 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                />
              ) : (
                <img
                  src={eyeOpenIcon}
                  alt="Eye-icon"
                  className="w-6 h-6 absolute right-4 opacity-40 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                />
              )}
              {errors.password && (
                <div className="absolute -top-4 left-0 mt-1 bg-red-500 text-white text-sm px-3 py-1 rounded-md shadow z-10">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="flex justify-end pb-2">
              {/* <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="check"
                  className="text-767e85"
                  {...register("remember")}
                />
                <label htmlFor="check" className="text-767e85">
                  Remember Me
                </label>
              </div> */}
              <Link
                to={paths.auth.forgotPassword.getHref()}
                className="text-ff5656 text-base"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="bg-primary text-black md:py-sp18 py-3 w-full text-center text-lg rounded-2xl font-bold md:mb-sp38 mb-4"
            style={{ opacity: loginMutation.isPending ? 0.5 : 1 }}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>

          {loginMutation.error && (
            <p className="text-red-500 text-sm text-center mb-4">
              {loginMutation.error?.message || "Login failed. Try again."}
            </p>
          )}

          <p className="max-w-sp289 w-full text-center mx-auto text-767e85 text-xs leading-20">
            By tapping log in, you agree to the following{" "}
            <span className="text-black italic underline font-semibold">
              Privacy Policy
            </span>{" "}
            &{" "}
            <span className="text-black italic underline font-semibold">
              {" "}
              Terms & Conditions
            </span>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
