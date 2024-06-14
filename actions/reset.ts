"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema, ResetValidator } from "@/lib/validators/reset";

export const reset = async (values: ResetValidator) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedFields.data;

  //Check if user exists
  const userExists = await getUserByEmail(email);

  if (!userExists) {
    return { error: "Email not found!" };
  }

  //Generate token
  const passwordResetToken = await generatePasswordResetToken(email);

  //Send email
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
