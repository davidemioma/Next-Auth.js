import crypto from "crypto";
import prismadb from "./prismadb";
import { v4 as uuidv4 } from "uuid";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  //This is expiring in 1 hour.
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  //Check if there is an existing verification token for this email.
  const existingToken = await getVerificationTokenByEmail(email);

  //Delete existing token
  if (existingToken) {
    await prismadb.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  //Create a new token.
  const verficationToken = await prismadb.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verficationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();

  //This is expiring in 1 hour.
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  //Check if there is an existing verification token for this email.
  const existingToken = await getPasswordResetTokenByEmail(email);

  //Delete existing token
  if (existingToken) {
    await prismadb.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  //Create a new token.
  const passwordResetToken = await prismadb.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwofactorToken = async (email: string) => {
  //Generate random 6 digits
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  //This is expiring in 5 min.
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  //Check if there is an existing verification token for this email.
  const existingToken = await getTwoFactorTokenByEmail(email);

  //Delete existing token
  if (existingToken) {
    await prismadb.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  //Create a new token.
  const twoFactorToken = await prismadb.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
