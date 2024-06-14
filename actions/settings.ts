"use server";

import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsValidator } from "@/lib/validators/settings";
import { update } from "@/auth";

export const settings = async (values: SettingsValidator) => {
  const { user } = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await prismadb.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  //To prevent user from changing the data if they login from google or github.
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // If credential users wants to change their email
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent!" };
  }

  let hashedPassword = undefined;

  // If credential users wants to change their password
  if (values.password && values.newPassword && dbUser.hashedPassword) {
    //Compare password to password in the database
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.hashedPassword
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    //if password match encrypt new password
    const hashedNewPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = undefined;

    values.newPassword = undefined;

    hashedPassword = hashedNewPassword;
  }

  const updatedUser = await prismadb.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      name: values.name,
      email: values.email,
      role: values.role,
      hashedPassword,
      isTwoFactorEnabled: values.isTwoFactorEnabled,
    },
  });

  //Server side next auth update
  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    },
  });

  return { success: "Settings Updated!" };
};
