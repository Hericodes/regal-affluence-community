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