import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";
import { loginSuccess } from "@/redux/service/authSlice";
import { API_BASE_URL, APP_NAME } from "@/constants/appConstants";
import { fetchInvestments } from "@/redux/service/investmentSlice";
import { useAppDispatch } from "@/hooks/hooks";

// const schema = yup.object().shape({
//   username: yup.string().required("Username is required"),
//   password: yup.string().required("Password is required"),
// });

const schema = yup.object().shape({
  username: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  // .matches(/[0-9]/, "Password must contain at least one number")
  // .matches(
  //   /[@$!%*?&]/,
  //   "Password must contain at least one special character"
  // ),
});

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/users`, {
        params: {
          username: data.username,
          password: data.password,
        },
      });

      // if (res.data.length > 0) {
      //   const user = res.data[0];
      //   localStorage.setItem("user", JSON.stringify(user));
      //   dispatch(loginSuccess(user));

      //   toast.success("Login Successful!");

      //   if (user.role === "admin") {
      //     navigate("/users");
      //   } else {
      //     navigate("/dashboard");
      //   }
      // } else {
      //   // setError("Invalid credentials");
      //   toast.error("Invalid credentials");
      // }
      if (res.data.length > 0) {
        const user = res.data[0];

        if (user.status === "frozen") {
          toast.error("Your account is frozen. Please contact bank.");
          return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        dispatch(loginSuccess(user));
        dispatch(fetchInvestments());

        toast.success("Login Successful!");

        if (user.role === "admin") {
          navigate("/users");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#99CFF0] to-[#C3A1E6]">
      <Card className="w-[450px] p-10 bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center text-3xl font-bold mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">{APP_NAME}</h2>
          <h3 className="text-2xl font-semibold text-gray-700">Login</h3>
          {/* <h1 className="text-2xl font-bold mt-2">Login</h1> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                className="h-12 text-base px-4"
                placeholder="Email"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                className="h-12 text-base px-4 pr-10" // Add padding to the right for icon
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full h-12 text-base">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
