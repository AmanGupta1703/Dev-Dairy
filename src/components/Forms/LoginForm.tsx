import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { authService } from "../../services/appwrite/auth";
import { login } from "../../store/authSlice";
import { Input, Button } from "../../components";
import { AppwriteException } from "appwrite";

type LoginFormInputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(data: LoginFormInputs) {
    setError("");

    const isInputFieldsEmpty = Object.keys(data).some(
      (key) => data[key as keyof LoginFormInputs] === "",
    );

    if (isInputFieldsEmpty) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      const session = await authService.login({ ...data });

      if (session) {
        const userData = await authService.getLoggedInUserDetails();

        if (userData) {
          dispatch(login({ userData }));
          navigate("/posts");
        } else {
          setError("Failed to retrieve user details. Please try again.");
        }
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.log("LoginForm :: handleLogin :: error", error);
      setError(
        error instanceof AppwriteException || error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <div className="flex justify-center">
        <div className="w-2/6 rounded-2xl bg-white px-5 py-6 shadow-lg drop-shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">
            Login to Your Account
          </h1>

          <article>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-4 space-y-3">
                {error ? (
                  <p className="animate-pulse rounded border border-red-300 bg-red-100 px-3 py-2 text-sm font-medium text-red-600">
                    {error}
                  </p>
                ) : null}

                <Input
                  type="email"
                  label="Email: "
                  placeholder="Enter Email"
                  {...register("email", { required: true })}
                />

                <Input
                  type="password"
                  label="Password: "
                  placeholder="Enter Password"
                  {...register("password", { required: true })}
                />
              </div>

              <Button
                className="block w-full"
                type="submit"
                disabled={isLoading}
                style={{ cursor: isLoading ? "not-allowed" : "" }}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </article>

          <article className="mt-4">
            <p className="text-center text-base text-slate-600">
              Don't have an account?
              <Link
                to="/sign-up"
                className="ml-1.5 inline-block font-bold text-blue-500 underline transition-all duration-200 hover:text-blue-600 focus:ring-1 focus:ring-blue-600 focus:ring-offset-1 focus:outline-none">
                Sign up
              </Link>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
