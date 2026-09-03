/* =========================================================
   REGAL AFFLUENCE MEMBER API
   ========================================================= */

const GOOGLE_SHEETS_API =
  "https://script.google.com/macros/s/AKfycbzNHL0mcmPqJ15NAiRM1io3ilwUXlulo8vrV7qdSgy9qYxyjkzk5O5VjNgpvxaeeCSh/exec";

/* =========================================================
   TYPES
========================================================= */

export interface MemberProfile {
  timestamp?: string;

  fullName: string;
  email: string;
  phone: string;
  occupation: string;
  businessName: string;
  location: string;
  socialMedia: string;
  referralSource: string;
  whyJoin: string;
  skills: string;

  memberId: string;
  username: string;

  profilePhoto: string;
  bankName: string;
  accountName: string;
  accountNumber: string;

  status: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  memberId?: string;
  username?: string;
  profile?: MemberProfile;
}

/* =========================================================
   GENERIC REQUEST
========================================================= */

const postToMemberApi = async (
  payload: Record<string, unknown>
): Promise<ApiResponse> => {
  const response = await fetch(GOOGLE_SHEETS_API, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      "Unable to connect to the member service."
    );
  }

  const result =
    (await response.json()) as ApiResponse;

  if (!result.success) {
    throw new Error(
      result.message ||
        "The request could not be completed."
    );
  }

  return result;
};

/* =========================================================
   MEMBER LOGIN
========================================================= */

export const loginMember = async (
  username: string,
  password: string
): Promise<MemberProfile> => {
  const result =
    await postToMemberApi({
      action: "login",
      username: username.trim(),
      password,
    });

  if (!result.profile) {
    throw new Error(
      "Member profile was not returned."
    );
  }

  return result.profile;
};

/* =========================================================
   GET MEMBER PROFILE
========================================================= */

export const getMemberProfile = async (
  username: string,
  password: string
): Promise<MemberProfile> => {
  const result =
    await postToMemberApi({
      action: "getProfile",
      username: username.trim(),
      password,
    });

  if (!result.profile) {
    throw new Error(
      "Member profile was not returned."
    );
  }

  return result.profile;
};

/* =========================================================
   UPDATE MEMBER PROFILE
========================================================= */

export const updateMemberProfile = async (
  username: string,
  password: string,
  profile: {
    profilePhoto?: string;
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
  }
): Promise<MemberProfile> => {
  const result =
    await postToMemberApi({
      action: "updateProfile",

      username: username.trim(),
      password,

      profilePhoto:
        profile.profilePhoto ?? "",

      bankName:
        profile.bankName ?? "",

      accountName:
        profile.accountName ?? "",

      accountNumber:
        profile.accountNumber ?? "",
    });

  if (!result.profile) {
    throw new Error(
      "Updated member profile was not returned."
    );
  }

  return result.profile;
};

/* =========================================================
   REQUEST USERNAME RECOVERY
========================================================= */

export const requestUsernameRecovery = async (
  email: string
): Promise<string> => {
  const result =
    await postToMemberApi({
      action:
        "requestUsernameRecovery",

      email:
        email.trim().toLowerCase(),
    });

  return (
    result.message ||
    "If an account exists with that email address, a verification code has been sent."
  );
};

/* =========================================================
   VERIFY USERNAME RECOVERY
========================================================= */

export const verifyUsernameRecovery = async (
  email: string,
  code: string
): Promise<string> => {
  const result =
    await postToMemberApi({
      action:
        "verifyUsernameRecovery",

      email:
        email.trim().toLowerCase(),

      code:
        code.trim(),
    });

  if (!result.username) {
    throw new Error(
      "Username was not returned."
    );
  }

  return result.username;
};

/* =========================================================
   REQUEST PASSWORD RESET
========================================================= */

export const requestPasswordReset = async (
  username: string,
  email: string
): Promise<string> => {
  const result =
    await postToMemberApi({
      action:
        "requestPasswordReset",

      username:
        username.trim().toLowerCase(),

      email:
        email.trim().toLowerCase(),
    });

  return (
    result.message ||
    "If the username and email match an account, a verification code has been sent."
  );
};

/* =========================================================
   RESET PASSWORD
========================================================= */

export const resetPassword = async (
  username: string,
  email: string,
  code: string,
  newPassword: string
): Promise<string> => {
  const result =
    await postToMemberApi({
      action:
        "resetPassword",

      username:
        username.trim().toLowerCase(),

      email:
        email.trim().toLowerCase(),

      code:
        code.trim(),

      newPassword,
    });

  return (
    result.message ||
    "Your password has been reset successfully."
  );
};