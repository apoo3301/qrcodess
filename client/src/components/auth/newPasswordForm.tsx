"use client";

import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "~/components/ui/form";
import { CardWrapper } from "~/components/auth/cardWrapper";
import { FormSuccess } from "~/components/formSuccess";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPassword } from "~/actions/new-password";
import { FormError } from "~/components/formError";
import { useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { useState, useTransition } from "react";
import { Input } from "~/components/ui/input";
import { NewPasswordSchema } from "~/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    // console.log({ formValues: values });

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
