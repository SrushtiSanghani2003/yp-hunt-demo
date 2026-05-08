import { useEffect, useRef, useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import Button from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { resetToken, selectTempToken } from "../redux-toolkit/tempTokenSlice";
import api from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../utils/toastUtils";
import { setUserDetails } from "../redux-toolkit/userDetailSlice";
import { useLocation, useNavigate } from "react-router-dom";

const VerificationCode = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const location = useLocation();
  const redirectTo =
    new URLSearchParams(location.search).get("redirectTo") || "/dashboard";
  const navigate = useNavigate();

  const { tempToken } = useSelector(selectTempToken);

  const sendToken = async ({
    token,
    code,
  }: {
    token: string;
    code: number;
  }) => {
    const res = await api.post("/auth/verify-2fa", {
      token,
      code,
    });
    return res.data;
  };

  const tokenMutation = useMutation({
    mutationFn: sendToken,
    onSuccess: (data) => {
      dispatch(setUserDetails(data));
      dispatch(resetToken());
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
        exact: false,
      });
      showToast("Login Successful", "success");
      navigate(redirectTo, { replace: true });
    },
    onError: () => {
      showToast("Error while sending token", "error");
    },
  });

  const resendMutation = useMutation({
    mutationFn: async (token: string) => {
      const res = await api.post("/auth/resend-2fa", {
        token,
      });
      return res.data;
    },
    onSuccess: () => {
      showToast("Verification code sent successfully", "success");
    },
    onError: () => {
      showToast("Failed to send verification code", "error");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (/^[0-9]$/.test(val)) {
      const newCode = [...code];
      newCode[index] = val;
      setCode(newCode);

      // Move to next input
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (val === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasted)) return;

    const digits = pasted.split("");
    setCode(digits); // ✅ this updates all inputs since they are now controlled
    inputRefs.current[5]?.focus(); // optionally focus the last input
    e.preventDefault();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];

    const isCtrlOrCmd = e.ctrlKey || e.metaKey;

    // Allow control shortcuts like Ctrl+V, Cmd+V
    if (isCtrlOrCmd) return;

    // Allow only numbers and allowed keys
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }

    // Handle backspace navigation
    if (e.key === "Backspace") {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    const finalCode = code.join("");
    tokenMutation.mutate({ token: tempToken, code: Number(finalCode) });
  };

  const handleResend = () => {
    if (!tempToken) {
      showToast("No token available to resend code", "error");
      return;
    }
    resendMutation.mutate(tempToken);
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code]);

  return (
    <AuthLayout contentWidth="lg:max-w-sp419 max-w-[300px]">
      <div className="lg:mb-11">
        <div className="lg:mb-10 mb-5">
          <h2 className="font-bold lg:text-40/60 md:text-3xl text-2xl leading-60 uppercase mb-2">
            Verification Code
          </h2>
          <p className="lg:text-base/5 text-sm text-black opacity-60">
            We have sent a verification code to your email address please check
            your email
          </p>
        </div>

        <div className="lg:mb-sp42 mb-6">
          <div
            className="grid grid-cols-6 lg:gap-3 gap-0 lg:h-sp78 h-9   mb-6"
            onPaste={handlePaste}
          >
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                maxLength={1}
                value={code[i]}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="lg:h-full h-11 lg:w-full w-11 text-center text-xl border border-gray-300 rounded-2xl"
              />
            ))}
          </div>

          <div className="flex items-center gap-1">
            <p>Didn't receive code?</p>
            <span className="font-bold underline cursor-pointer" onClick={handleResend}>
              Send again
            </span>
          </div>
        </div>

        <Button
          text="Submit"
          className={`w-full font-bold md:py-4 py-2  ${tokenMutation.isPending || resendMutation.isPending
            ? "opacity-50"
            : "opacity-100"
            }`}
          textSize="text-base/5"
          onClick={handleSubmit}
          disabled={tokenMutation.isPending || resendMutation.isPending}
          isLoading={tokenMutation.isPending}
        />
      </div>
    </AuthLayout>
  );
};

export default VerificationCode;
