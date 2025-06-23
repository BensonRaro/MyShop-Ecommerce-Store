"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const LoginPage = () => {
  const login = async (provider: "github" | "google") => {
    await authClient.signIn.social({
      provider,
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-6 sm:p-16 size-fit shadow-2xl rounded-lg">
        <div className="space-y-4">
          <Image
            src="/favicon.ico"
            loading="lazy"
            alt="logo"
            width={40}
            height={40}
            className="w-10"
          />
          <h2 className="mb-8 text-2xl text-primary font-bold">
            Sign In to My Shop
          </h2>
        </div>
        {/* google btn */}
        <div className="mt-16 grid space-y-4">
          <button className="google-btn group" onClick={() => login("google")}>
            <div className="relative flex items-center space-x-4 justify-center">
              <FcGoogle className="absolute left-0 size-6" />
              <span className="google-span">Continue with Google</span>
            </div>
          </button>
          <button className="google-btn group" onClick={() => login("github")}>
            <div className="relative flex items-center space-x-4 justify-center">
              <FaGithub className="absolute left-0 size-6" />
              <span className="google-span">Continue with Github</span>
            </div>
          </button>
          <button className="google-btn group">
            <div className="relative flex items-center space-x-4 justify-center">
              <FaDiscord className="absolute left-0 size-6" />
              <span className="google-span">Continue with Discord</span>
            </div>
          </button>
        </div>
        <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
          <p className="text-xs">
            By proceeding, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Use
            </a>{" "}
            and confirm you have read our{" "}
            <a href="#" className="underline">
              Privacy and Cookie Statement
            </a>
            .
          </p>
          <p className="text-xs">
            This site is protected by reCAPTCHA and the{" "}
            <a href="#" className="underline">
              Google Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
