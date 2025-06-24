import { useState } from "react";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Input, Button } from "../../components";

type LoginFormInputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const [error, setError] = useState<string>("");

  const { register, handleSubmit } = useForm<LoginFormInputs>();

  function handleLogin(data: LoginFormInputs) {
    setError("");

    const isInputFieldsEmpty = Object.keys(data).some(
      (key) => data[key as keyof LoginFormInputs] === "",
    );

    if (isInputFieldsEmpty) {
      setError("All fields are required.");
      return;
    }

    console.log(data);
  }

  return (
    <section>
      <div className="flex justify-center">
        <div className="w-2/6 rounded-lg bg-white px-5 py-6 shadow-lg drop-shadow-lg">
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
                  {...register("email")}
                />

                <Input
                  type="password"
                  label="Password: "
                  placeholder="Enter Password"
                  {...register("password")}
                />
              </div>

              <Button className="block w-full" type="submit">
                Submit
              </Button>
            </form>
          </article>

          <article className="mt-4">
            <p className="text-base text-slate-600">
              Don't have an account?
              <Link
                to="/sign-up"
                className="ml-1.5 inline-block font-bold text-slate-800 underline transition-all duration-200 hover:text-slate-900 focus:ring-1 focus:ring-slate-900 focus:ring-offset-1 focus:outline-none"
              >
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
