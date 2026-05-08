import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import { paths } from "../config/paths";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { showToast } from "../utils/toastUtils";

// ✅ Zod validation schema
const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

const ForgotPassword = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // ✅ API call mutation
  const forgotMutation = useMutation({
    mutationFn: async (data: FormData) => {
      try {
        const response = await api.post("admin/forgot-password", data);

        return response.data;

      } catch (error: any) {

        const message =
          error.response?.data?.message || error.message || "Request failed.";
        throw new Error(message);
      }
    },
    onSuccess: () => {
      showToast("Reset link sent to your email!", "success");
      reset(); // clear input field
      setTimeout(() => {
        navigate(paths.auth.login.getHref());
      }, 1500); // Optional small delay to show toast

    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  // ✅ Form submit handler
  const onSubmit = (data: FormData) => {
    forgotMutation.mutate(data);
  };

  return (
    <AuthLayout contentWidth="max-w-sp419">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-sp42">
          <h2 className="text-40 leading-60 uppercase text-black mb-3 font-bold">
            Forgot Password
          </h2>
          <p className="font-normal text-lg mb-12">
            Enter <span className="font-bold">your email</span> and we'll send you
            a link to reset your password.
          </p>

          <div className="relative">
            <input
              type="text"
              {...register("email")}
              className="p-5 bg-white rounded-2xl text-lg w-full border border-gray-300"
              placeholder="Enter email"
            />
            {errors.email && (
              <div className="absolute -top-5 left-0 mt-1 bg-red-500 text-white text-sm px-3 py-1 rounded-md shadow z-10">
                {errors.email.message}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={forgotMutation.isPending}
          className="bg-primary text-black py-sp18 w-full text-center text-lg rounded-2xl font-bold mb-8"
          style={{
            opacity: forgotMutation.isPending ? 0.5 : 1,
            cursor: forgotMutation.isPending ? "not-allowed" : "pointer",
          }}
        >
          {forgotMutation.isPending ? "Submitting..." : "Submit"}
        </button>

        {forgotMutation.error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {forgotMutation.error.message || "Something went wrong. Try again."}
          </p>
        )}

        <Link
          to={paths.auth.login.getHref()}
          className="italic w-full block text-lg text-767e85 underline text-center"
        >
          Back to login
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
