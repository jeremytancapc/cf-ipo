"use server";

import { z } from "zod";
import { getSupabase } from "@/lib/supabase";

const contactSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(100),
  last_name: z.string().trim().min(1, "Last name is required").max(100),
  email: z.email("Enter a valid work email").max(200),
  organization: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Tell us a bit about what you're looking for").max(4000),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
};

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    organization: formData.get("organization") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof z.infer<typeof contactSchema>;
      fieldErrors[field] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return {
      status: "error",
      message: "Submissions are temporarily unavailable — please email us at ipo@capc.com.sg.",
    };
  }

  const { error } = await supabase.from("contact_requests").insert(parsed.data);
  if (error) {
    console.error("contact_requests insert failed:", error.message);
    return {
      status: "error",
      message: "Something went wrong — please email us at ipo@capc.com.sg.",
    };
  }

  return {
    status: "success",
    message: "Thank you — our investor relations team will be in touch shortly.",
  };
}
