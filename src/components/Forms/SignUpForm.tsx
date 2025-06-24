import { useState } from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button, Input } from "../../components";

type SignUpFormInputs = {
  fullName: string;
  email: string;
  password: string;
};

function SignUpForm() {
  const [error, setError] = useState<string>("");

  const { register, handleSubmit } = useForm<SignUpFormInputs>();

  function handleLogin(data: SignUpFormInputs) {
    setError("");

    const isInputFieldsEmpty = Object.keys(data).some(
      (key) => data[key as keyof SignUpFormInputs] === "",
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
            Sign Up for Your Account
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

              <Button className="block w-full" type="submit">
                Submit
              </Button>
            </form>
          </article>

          <article className="mt-4">
            <p className="text-base text-slate-600">
              Already have an account?
              <Link
                to="/login"
                className="ml-1.5 inline-block font-bold text-slate-800 underline transition-all duration-200 hover:text-slate-900 focus:ring-1 focus:ring-slate-900 focus:ring-offset-1 focus:outline-none"
              >
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
