"use client";

import { Formik } from "formik";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
// api
import { login } from "@/lib/api";
// types
import { LoginInput, LoginReponse } from "@/types";
// actions
import { createAuthCookie } from "@/actions/auth.action";
// helpers
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";

export const Login = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    email: "john.doe@example.com",
    password: "demodemo",
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: LoginInput) => login(data),

    onSuccess: async (data: LoginReponse) => {
      await createAuthCookie(data.token);
      toast.success("Login successful");

      router.replace("/");
    },

    onError: () => {
      toast.error("Login failed");
    },
  });

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      await mutateAsync(values);
    },
    [mutateAsync],
  );

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">Login</div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                variant="bordered"
                label="Email"
                type="email"
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant="bordered"
                label="Password"
                type="password"
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
            >
              Login
            </Button>
          </>
        )}
      </Formik>

      {/* <div className='font-light text-slate-400 mt-4 text-sm'>
        Don&apos;t have an account ?{" "}
        <Link href='/register' className='font-bold'>
          Register here
        </Link>
      </div> */}
    </>
  );
};
