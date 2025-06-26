import { useState } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppwriteException } from "appwrite";

import { authService } from "../../services/appwrite/auth";
import { login } from "../../store/authSlice";
import { Button, Input } from "../../components";

type SignUpFormInputs = {
  fullName: string;
  email: string;
  password: string;
};

function SignUpForm() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<SignUpFormInputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignUp(data: SignUpFormInputs) {
    const isInputFieldsEmpty = Object.keys(data).some(
      (key) => data[key as keyof SignUpFormInputs] === "",
    );

    if (isInputFieldsEmpty) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      const session = await authService.createAccount({ ...data });

      if (session) {
        const userData = await authService.getLoggedInUserDetails();

        if (userData) dispatch(login({ userData }));
        else setError("Failed to retrieve user details after sign up.");

        navigate("/posts");
      }
    } catch (error) {
      console.log("SignUpForm :: handleLogin :: error ::", error);
      setError(
        error instanceof AppwriteException || error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
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
            Sign Up for Your Account
          </h1>

          <article>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <div className="mb-4 space-y-3">
                {error ? (
                  <p className="animate-pulse rounded border border-red-300 bg-red-100 px-3 py-2 text-sm font-medium text-red-600">
                    {error}
                  </p>
                ) : null}

                <Input
                  type="text"
                  label="Full Name: "
                  placeholder="Enter Fullname..."
                  {...register("fullName", { required: true })}
                />

                <Input
                  type="email"
                  label="Email: "
                  placeholder="Enter Email..."
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
                disabled={isLoading}
                className={`block w-full ${isLoading ? "animate-pulse opacity-90" : ""}`}
                type="submit"
                style={{ cursor: isLoading ? "not-allowed" : "" }}>
                {!isLoading ? "Sign Up" : "Creating Account..."}
              </Button>
            </form>
          </article>

          <article className="mt-4">
            <p className="text-center text-base text-slate-600">
              Already have an account?
              <Link
                to="/login"
                className="ml-1.5 inline-block font-bold text-blue-500 underline transition-all duration-200 hover:text-blue-600 focus:ring-1 focus:ring-blue-600 focus:ring-offset-1 focus:outline-none">
                Sign in
              </Link>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;
