"use client";

import { authClient } from "../../lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data , error } = await authClient.signIn.email({
   
      email,
      password,
    
    });

    if (error) {
      if (
        error?.message?.includes("already") ||
        error?.message?.includes("exists")
      ) {
        return toast.error("User already logged in");
      }

      return toast.error("Signin failed");
    }

    toast.success("Signin successful");

    setTimeout(() => {
      router.push("/");
    }, 900);
  };

  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <div className="px-4 py-10">
    <Card className="mx-auto w-full max-w-md border border-blue-400/20 bg-slate-900/90 px-5 py-10 text-slate-100 shadow-2xl shadow-blue-950/50">
      <h1 className="text-center text-2xl font-bold text-white">Login page</h1>

      <Form className="mx-auto flex w-full flex-col gap-4" onSubmit={onSubmit}>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="Enter your email" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={6}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 6) {
              return "Password must be at least 6 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description className="text-slate-400">
            Must be at least 6 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

      
        <Button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-6 font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700"
        >
          <Check />
          Login
        </Button>

      
      </Form>
      <Button variant="ghost" className="text-blue-300">
        Forget password
      </Button>

      <div className="mx-auto mt-5 flex w-full flex-col gap-3">
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link className="font-semibold text-blue-300" href="/signin">
            Login
          </Link>
        </p>
        <Button onClick={handleGoogleLogin} variant="outline" className="w-full border border-blue-400/40 text-blue-100">
          <FaGoogle /> Continue with Google
        </Button>
      </div>
    </Card>
    </div>
  );
}