"use client";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import { loginValidationSchema } from "./loginValidation";
import { getCurrentUser, loginUser } from "@/services/AuthServices";
// import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
const LoginForm = ({ redirectPath }: { redirectPath: string | undefined }) => {
  const router = useRouter();
  const { setUser } = useUser();
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        setUser(await getCurrentUser());
        // setIsLoading(true);
        toast.success(res?.message);
        router.push(redirectPath || "/");
        // setTimeout(() => {
        //   router.push(redirectPath || '/');
        // }, 100);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="dark:text-white text-black bg-transparent relative grid place-items-center h-[100vh] w-full ">
      <div className="backdrop-blur-2xl p-8 rounded-lg shadow-lg max-w-md w-full border-2 border-green-500 relative">
        {/* <Link
          href={"/"}
          className="border inline font-bold shadow-md hover:shadow-sm hover:cursor-pointer px-3 py-1 rounded-full absolute top-0 right-0 m-2"
        >
          X
        </Link> */}
        <h2 className="text-3xl font-bold text-center mb-6 text-black dark:text-green-500 tracking-wide">
          Log In
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="text-center">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input
                      className="my-4 py-6"
                      placeholder="Enter Email"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <PasswordInput
                      // type="password"
                      className="my-4 py-6"
                      placeholder="Enter Password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-green-600 mt-3">
              {isSubmitting ? "Logging in.." : "Log in"}
            </Button>
            {/* <h1 className="flex mt-8">
              Don&apos;t Have an Account? Please
              <Link href="/register">
                <span className="text-green-700 ml-2 font-bold">Register</span>
              </Link>
            </h1> */}
          </form>
        </Form>
      </div>
    </div>
  );
};
export default LoginForm;
