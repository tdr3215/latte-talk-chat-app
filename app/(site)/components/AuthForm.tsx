"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
// CUSTOM COMPONENTS
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type AuthType = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [authType, setAuthType] = useState<AuthType>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session.status, router]);

  // TOGGLE LOGIN / REGISTER
  const toggleAuthType = useCallback(() => {
    if (authType === "LOGIN") {
      setAuthType("REGISTER");
    } else {
      setAuthType("LOGIN");
    }
  }, [authType]);

  // SET DEFAULT VALUES and destructure form actions/errors
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (authType === "REGISTER") {
      // Axios Register
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    }

    if (authType === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Successfly logged in!");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth Social Signin
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }

        if (callback?.ok && !callback?.error) {
          toast.success(`Successfully logged into ${action}`);
        }
      })
      .finally(() => setIsLoading(false));
  };

  // AUTH FORM COMPONENT
  return (
    <div
      className="
  mt-8
  sm:mx-auto
  sm:w-full
  sm:max-w-md
  "
    >
      <div
        className="
      bg-secondary-content
      px-4
      py-8
      shadow
      sm:rounded-lg
      sm:px-10
      "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* REGISTER/SIGNIN INPUTS */}
          {authType === "REGISTER" && (
            <Input label="Name" register={register} id="name" errors={errors} />
          )}
          <Input
            label="Email Address"
            type="email"
            register={register}
            id="email"
            errors={errors}
          />
          <Input
            label="Password"
            type="password"
            register={register}
            id="password"
            errors={errors}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {authType === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        {/* Widget Footer */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-secondary-content px-2 text-base-300">
                Or continue with
              </span>
            </div>
          </div>

          {/* ALTERNATIVE SIGNIN OPTIONS */}
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div
          className="
        flex
        gap-2
        justify-center
        text-sm
        mt-6
        px-2
        text-base-300
        "
        >
          {/* LOGIN OR SIGN UP */}
          <div>
            {authType === "LOGIN"
              ? "New to Latte Talk?"
              : "Already have an account?"}
          </div>
          <div className="underline cursor-pointer" onClick={toggleAuthType}>
            {authType === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
