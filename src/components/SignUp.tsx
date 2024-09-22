"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

import { signUp } from "../../actions/signUp";
import { useRouter } from "next/navigation";

export function SignUp() {
  const [StationName, setStationName] = useState("");
  const [StationId, setStationId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phNumber, setPhNumber] = useState("");
  const route = useRouter();
  return (
    <div className="md:px-28 w-full mx-auto rounded-none md:rounded-2xl p-4 md:py-8  shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Mega Police
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>

      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="firstname">Police Station Name</Label>
          <Input
            id="firstname"
            placeholder="Naihati Police Station"
            type="text"
            onChange={(e) => {
              setStationName(e.target.value);
            }}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="lastname">Police Station No.</Label>
          <Input
            onChange={(e) => {
              setStationId(e.target.value);
            }}
            id="lastname"
            placeholder="123456"
            type="number"
          />
        </LabelInputContainer>
      </div>
      <LabelInputContainer>
        <Label htmlFor="lastname">Police Station Ph NO</Label>
        <Input
          onChange={(e) => {
            setPhNumber(e.target.value);
          }}
          id="lastname"
          placeholder="1234567890"
          type="number"
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="email"
          placeholder="projectmayhem@fc.com"
          type="email"
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="password"
          placeholder="••••••••"
          type="password"
        />
      </LabelInputContainer>

      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
        onClick={async () => {
          const data = await signUp({
            StationName,
            StationId,
            email,
            password,
            phNumber,
          });
          if (data) {
            route.push("/home");
          }
        }}
      >
        Sign up &rarr;
        <BottomGradient />
      </button>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
