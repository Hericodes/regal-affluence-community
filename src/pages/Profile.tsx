import {
  useEffect,
  useState,
} from "react";
import type { FormEvent } from "react";

import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  getMemberProfile,
  updateMemberProfile,
  type MemberProfile,
} from "../api/memberApi";

/* =========================================================
   COMMUNITY LINK
========================================================= */

const COMMUNITY_LINK =
  "https://chat.whatsapp.com/GYwqKaaMWU5AUrMr0VxhHW?s=cl&p=i&mlu=0&ilr=4";

/* =========================================================
   SESSION TYPE
========================================================= */

interface MemberSession {
  username: string;
  password: string;
}

/* =========================================================
   HELPERS
========================================================= */

const formatDate = (value?: string) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/* =========================================================
   COMPONENT
========================================================= */

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] =
    useState<MemberProfile | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [communityPromptOpen, setCommunityPromptOpen] =
    useState(false);

  const [profilePhoto, setProfilePhoto] =
    useState("");

  const [bankName, setBankName] =
    useState("");

  const [accountName, setAccountName] =
    useState("");

  const [accountNumber, setAccountNumber] =
    useState("");

  /* =======================================================
     ACCOUNT COMPLETION CHECK
  ======================================================= */

  const isAccountDetailsComplete =
    String(bankName || "").trim().length > 0 &&
    String(accountName || "").trim().length > 0 &&
    String(accountNumber || "").trim().length === 10;

  /* =======================================================
     LOAD MEMBER PROFILE
  ======================================================= */

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedAuth =
          sessionStorage.getItem(
            "regalMemberAuth"
          );

        if (!storedAuth) {
          navigate("/login", {
            replace: true,
          });

          return;
        }

        let session: MemberSession;

        try {
          session =
            JSON.parse(
              storedAuth
            ) as MemberSession;
        } catch {
          sessionStorage.removeItem(
            "regalMemberAuth"
          );

          sessionStorage.removeItem(
            "regalMember"
          );

          navigate("/login", {
            replace: true,
          });

          return;
        }

        if (
          !session.username ||
          !session.password
        ) {
          sessionStorage.removeItem(
            "regalMemberAuth"
          );

          sessionStorage.removeItem(
            "regalMember"
          );

          navigate("/login", {
            replace: true,
          });

          return;
        }

        const member =
          await getMemberProfile(
            session.username,
            session.password
          );

        setProfile(member);

        setProfilePhoto(
          String(member.profilePhoto || "")
        );

        setBankName(
          String(member.bankName || "")
        );

        setAccountName(
          String(member.accountName || "")
        );

        setAccountNumber(
          String(member.accountNumber || "")
        );
      } catch (profileError) {
        console.error(
          "Profile loading error:",
          profileError
        );

        setError(
          profileError instanceof Error
            ? profileError.message
            : "Unable to load your member profile."
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, [navigate]);

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    sessionStorage.removeItem(
      "regalMember"
    );

    sessionStorage.removeItem(
      "regalMemberAuth"
    );

    window.dispatchEvent(
      new Event("regal-member-session")
    );

    navigate("/login", {
      replace: true,
    });
  };

  /* =======================================================
     COMMUNITY ACCESS
  ======================================================= */

  const handleCommunityClick = () => {
    if (!isAccountDetailsComplete) {
      setCommunityPromptOpen(true);
      return;
    }

    window.open(
      COMMUNITY_LINK,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleCommunityJump = () => {
    document
      .getElementById("community-access")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  /* =======================================================
     SAVE PROFILE
  ======================================================= */

  const handleSave = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSaving(true);
    setError("");
    setSuccessMessage("");

    /* -----------------------------------------------
       VALIDATE ACCOUNT NUMBER
    ------------------------------------------------ */

    const cleanAccountNumber =
      String(accountNumber || "")
        .replace(/\D/g, "")
        .slice(0, 10);

    setAccountNumber(
      cleanAccountNumber
    );

    if (!bankName.trim()) {
      setError(
        "Please enter your bank name."
      );

      setIsSaving(false);

      return;
    }

    if (!accountName.trim()) {
      setError(
        "Please enter your account name."
      );

      setIsSaving(false);

      return;
    }

    if (
      cleanAccountNumber.length !== 10
    ) {
      setError(
        "Please enter a valid 10-digit account number."
      );

      setIsSaving(false);

      return;
    }

    try {
      const storedAuth =
        sessionStorage.getItem(
          "regalMemberAuth"
        );

      if (!storedAuth) {
        navigate("/login", {
          replace: true,
        });

        return;
      }

      let session: MemberSession;

      try {
        session =
          JSON.parse(
            storedAuth
          ) as MemberSession;
      } catch {
        sessionStorage.removeItem(
          "regalMemberAuth"
        );

        sessionStorage.removeItem(
          "regalMember"
        );

        navigate("/login", {
          replace: true,
        });

        return;
      }

      if (
        !session.username ||
        !session.password
      ) {
        sessionStorage.removeItem(
          "regalMemberAuth"
        );

        sessionStorage.removeItem(
          "regalMember"
        );

        navigate("/login", {
          replace: true,
        });

        return;
      }

      const updatedProfile =
        await updateMemberProfile(
          session.username,
          session.password,
          {
            profilePhoto:
              profilePhoto.trim(),
            bankName:
              bankName.trim(),
            accountName:
              accountName.trim(),
            accountNumber:
              cleanAccountNumber,
          }
        );

      setProfile(
        updatedProfile
      );

      setProfilePhoto(
        String(
          updatedProfile.profilePhoto || ""
        )
      );

      setBankName(
        String(
          updatedProfile.bankName || ""
        )
      );

      setAccountName(
        String(
          updatedProfile.accountName || ""
        )
      );

      setAccountNumber(
        String(
          updatedProfile.accountNumber || ""
        )
      );

      setSuccessMessage(
        "Your profile has been updated successfully."
      );
    } catch (saveError) {
      console.error(
        "Profile update error:",
        saveError
      );

      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to update your profile."
      );
    } finally {
      setIsSaving(false);
    }
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (isLoading) {
    return (
      <Page>
        <LoadingContainer>
          <LoadingSpinner />

          <LoadingText>
            Loading your member profile...
          </LoadingText>
        </LoadingContainer>
      </Page>
    );
  }

  /* =======================================================
     ERROR WITHOUT PROFILE
  ======================================================= */

  if (!profile) {
    return (
      <Page>
        <Container>
          <ErrorCard>
            <Eyebrow>
              Member Profile
            </Eyebrow>

            <ErrorTitle>
              We could not load your profile.
            </ErrorTitle>

            <ErrorText>
              {error ||
                "Please sign in again to access your member profile."}
            </ErrorText>

            <PrimaryButton
              type="button"
              onClick={() =>
                navigate("/login")
              }
            >
              Return to login

              <Arrow aria-hidden="true">
                →
              </Arrow>
            </PrimaryButton>
          </ErrorCard>
        </Container>
      </Page>
    );
  }

  /* =======================================================
     MAIN PROFILE
  ======================================================= */

  return (
    <Page>
      <Glow />
      <AmbientOrb $position="left" />
      <AmbientOrb $position="right" />
      <GridOverlay aria-hidden="true" />

      <Container>
        {/* =================================================
            HEADER
        ================================================= */}

        <TopBar>
          <BrandArea>
            <Eyebrow>
              REGAL AFFLUENCE GROUP
            </Eyebrow>

            <PageTitle>
              My <Accent>Profile</Accent>
            </PageTitle>

            <PageDescription>
              Your member information and
              account details.
            </PageDescription>
          </BrandArea>

          <LogoutButton
            type="button"
            onClick={handleLogout}
          >
            Log out
          </LogoutButton>
        </TopBar>

        {/* =================================================
            MEMBERSHIP SUMMARY
        ================================================= */}

        <MembershipCard>
          <MembershipMain>
            <ProfileAvatar>
              {profile.profilePhoto ? (
                <AvatarImage
                  src={
                    profile.profilePhoto
                  }
                  alt={`${profile.fullName} profile`}
                />
              ) : (
                <AvatarInitials>
                  {profile.fullName
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map(
                      (name) =>
                        name
                          .charAt(0)
                          .toUpperCase()
                    )
                    .join("")}
                </AvatarInitials>
              )}
            </ProfileAvatar>

            <MembershipIdentity>
              <MembershipEyebrow>
                MEMBER
              </MembershipEyebrow>

              <MembershipName>
                {profile.fullName}
              </MembershipName>

              <MembershipOccupation>
                {profile.occupation ||
                  "Regal Affluence Member"}
              </MembershipOccupation>
            </MembershipIdentity>
          </MembershipMain>

          <MembershipDetails>
            <MembershipItem>
              <MembershipLabel>
                MEMBER ID
              </MembershipLabel>

              <MembershipValue>
                {profile.memberId}
              </MembershipValue>
            </MembershipItem>

            <MembershipItem>
              <MembershipLabel>
                STATUS
              </MembershipLabel>

              <StatusBadge>
                <StatusDot />

                {profile.status ||
                  "Active"}
              </StatusBadge>
            </MembershipItem>

            <MembershipItem>
              <MembershipLabel>
                DATE JOINED
              </MembershipLabel>

              <MembershipValue>
                {formatDate(
                  profile.timestamp
                )}
              </MembershipValue>
            </MembershipItem>
          </MembershipDetails>
        </MembershipCard>

        {/* =================================================
            ALERTS
        ================================================= */}

        {error && (
          <Alert
            $type="error"
            role="alert"
          >
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert
            $type="success"
            role="status"
          >
            {successMessage}
          </Alert>
        )}

        {/* =================================================
            PROFILE FORM
        ================================================= */}

        <Form
          onSubmit={handleSave}
        >
          {/* ===============================================
              PERSONAL INFORMATION
          ================================================ */}

          <SectionCard>
            <SectionHeader>
              <SectionEyebrow>
                01
              </SectionEyebrow>

              <SectionTitle>
                Personal Information
              </SectionTitle>

              <SectionDescription>
                This information was collected
                when you joined the Group.
              </SectionDescription>
            </SectionHeader>

            <InfoGrid>
              <ReadOnlyField>
                <ReadOnlyLabel>
                  FULL NAME
                </ReadOnlyLabel>

                <ReadOnlyValue>
                  {profile.fullName ||
                    "Not provided"}
                </ReadOnlyValue>
              </ReadOnlyField>

              <ReadOnlyField>
                <ReadOnlyLabel>
                  EMAIL ADDRESS
                </ReadOnlyLabel>

                <ReadOnlyValue>
                  {profile.email ||
                    "Not provided"}
                </ReadOnlyValue>
              </ReadOnlyField>

              <ReadOnlyField>
                <ReadOnlyLabel>
                  PHONE NUMBER
                </ReadOnlyLabel>

                <ReadOnlyValue>
                  {profile.phone ||
                    "Not provided"}
                </ReadOnlyValue>
              </ReadOnlyField>

              <ReadOnlyField>
                <ReadOnlyLabel>
                  OCCUPATION
                </ReadOnlyLabel>

                <ReadOnlyValue>
                  {profile.occupation ||
                    "Not provided"}
                </ReadOnlyValue>
              </ReadOnlyField>

              <ReadOnlyField>
                <ReadOnlyLabel>
                  BUSINESS NAME
                </ReadOnlyLabel>

                <ReadOnlyValue>
                  {profile.businessName ||
                    "Not provided"}
                </ReadOnlyValue>
              </ReadOnlyField>

              <ReadOnlyField>
                <ReadOnlyLabel>
                  LOCATION
                </ReadOnlyLabel>

                <ReadOnlyValue>
                  {profile.location ||
                    "Not provided"}
                </ReadOnlyValue>
              </ReadOnlyField>
            </InfoGrid>
          </SectionCard>

          {/* ===============================================
              PROFESSIONAL INFORMATION
          ================================================ */}

          <SectionCard>
            <SectionHeader>
              <SectionEyebrow>
                02
              </SectionEyebrow>

              <SectionTitle>
                Professional Information
              </SectionTitle>

              <SectionDescription>
                Your professional details from
                your membership application.
              </SectionDescription>
            </SectionHeader>

            <InfoGrid>
              <ReadOnlyField>
                <ReadOnlyLabel>
                  SOCIAL MEDIA
                </ReadOnlyLabel>

                <ReadOnlyValue>
                  {profile.socialMedia ||
                    "Not provided"}
                </ReadOnlyValue>
              </ReadOnlyField>

              <ReadOnlyField>
                <ReadOnlyLabel>
                  REFERRAL SOURCE
                </ReadOnlyLabel>

                <ReadOnlyValue>
                  {profile.referralSource ||
                    "Not provided"}
                </ReadOnlyValue>
              </ReadOnlyField>

              <FullWidth>
                <ReadOnlyField>
                  <ReadOnlyLabel>
                    SKILLS / EXPERTISE
                  </ReadOnlyLabel>

                  <ReadOnlyLongValue>
                    {profile.skills ||
                      "Not provided"}
                  </ReadOnlyLongValue>
                </ReadOnlyField>
              </FullWidth>

              <FullWidth>
                <ReadOnlyField>
                  <ReadOnlyLabel>
                    WHY I JOINED
                  </ReadOnlyLabel>

                  <ReadOnlyLongValue>
                    {profile.whyJoin ||
                      "Not provided"}
                  </ReadOnlyLongValue>
                </ReadOnlyField>
              </FullWidth>
            </InfoGrid>
          </SectionCard>

          {/* ===============================================
              MEMBERSHIP INFORMATION
          ================================================ */}

          <SectionCard>
            <SectionHeader>
              <SectionEyebrow>
                03
              </SectionEyebrow>

              <SectionTitle>
                Membership Information
              </SectionTitle>

              <SectionDescription>
                Your official Regal Affluence
                membership details.
              </SectionDescription>
            </SectionHeader>

            <InfoGrid>
              <ReadOnlyField>
                <ReadOnlyLabel>
                  MEMBER ID
                </ReadOnlyLabel>

                <ReadOnlyValue $highlight>
                  {profile.memberId}
                </ReadOnlyValue>
              </ReadOnlyField>

              <ReadOnlyField>
                <ReadOnlyLabel>
                  MEMBERSHIP STATUS
                </ReadOnlyLabel>

                <StatusBox>
                  <StatusDot />

                  {profile.status ||
                    "Active"}
                </StatusBox>
              </ReadOnlyField>

              <ReadOnlyField>
                <ReadOnlyLabel>
                  DATE JOINED
                </ReadOnlyLabel>

                <ReadOnlyValue>
                  {formatDate(
                    profile.timestamp
                  )}
                </ReadOnlyValue>
              </ReadOnlyField>
            </InfoGrid>
          </SectionCard>

          {/* ===============================================
              ADDITIONAL INFORMATION
          ================================================ */}

          <SectionCard id="additional-information" $featured>
            <SectionHeader>
              <SectionEyebrow>
                04
              </SectionEyebrow>

              <SectionTitle>
                Additional Information
              </SectionTitle>

              <SectionDescription>
                Complete the information below
                to finish setting up your member
                profile.
              </SectionDescription>
            </SectionHeader>

            <InfoGrid>
              {/* =========================================
                  PROFILE PHOTO
              ========================================== */}

              <FullWidth>
                <FieldGroup>
                  <Label htmlFor="profilePhoto">
                    Profile Photo <Optional>(Optional)</Optional>
                  </Label>

                  <Input
                    id="profilePhoto"
                    type="url"
                    value={profilePhoto}
                    onChange={(event) =>
                      setProfilePhoto(
                        event.target.value
                      )
                    }
                    placeholder="Paste your profile photo URL"
                  />

                  <FieldHint>
                    Add a direct image URL for
                    your profile photo.
                  </FieldHint>
                </FieldGroup>
              </FullWidth>

              {/* =========================================
                  BANK NAME
              ========================================== */}

              <FieldGroup>
                <Label htmlFor="bankName">
                  Bank Name
                </Label>

                <Input
                  id="bankName"
                  type="text"
                  value={bankName}
                  onChange={(event) =>
                    setBankName(
                      event.target.value
                    )
                  }
                  placeholder="Enter your bank name"
                  autoComplete="organization"
                />
              </FieldGroup>

              {/* =========================================
                  ACCOUNT NAME
              ========================================== */}

              <FieldGroup>
                <Label htmlFor="accountName">
                  Account Name
                </Label>

                <Input
                  id="accountName"
                  type="text"
                  value={accountName}
                  onChange={(event) =>
                    setAccountName(
                      event.target.value
                    )
                  }
                  placeholder="Enter the account name"
                  autoComplete="name"
                />
              </FieldGroup>

              {/* =========================================
                  ACCOUNT NUMBER
              ========================================== */}

              <FieldGroup>
                <Label htmlFor="accountNumber">
                  Account Number
                </Label>

                <Input
                  id="accountNumber"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  value={accountNumber}
                  onChange={(event) => {
                    const value =
                      event.target.value.replace(
                        /\D/g,
                        ""
                      );

                    setAccountNumber(
                      value.slice(0, 10)
                    );
                  }}
                  placeholder="10-digit account number"
                  autoComplete="off"
                />

                <FieldHint>
                  Enter your 10-digit Nigerian
                  bank account number.
                </FieldHint>
              </FieldGroup>
            </InfoGrid>

            {/* =========================================
                SECURITY NOTE
            ========================================== */}

            <SecurityNote>
              <SecurityIcon>
                ✓
              </SecurityIcon>

              <SecurityText>
                Your additional information is
                stored with your member record.
                Only provide accurate information
                and keep your member access
                details private.
              </SecurityText>
            </SecurityNote>

            {/* =========================================
                SAVE
            ========================================== */}

            <SaveArea>
              <SaveButton
                type="submit"
                disabled={isSaving}
              >
                {isSaving
                  ? "Saving changes..."
                  : "Save profile"}

                {!isSaving && (
                  <Arrow aria-hidden="true">
                    →
                  </Arrow>
                )}
              </SaveButton>
            </SaveArea>
          </SectionCard>
        </Form>

        {/* =================================================
            COMMUNITY ACCESS
        ================================================= */}

        <CommunityCard
          id="community-access"
          $complete={
            isAccountDetailsComplete
          }
        >
          <CommunityContent>
            <CommunityEyebrow>
              REGAL AFFLUENCE COMMUNITY
            </CommunityEyebrow>

            <CommunityTitle>
              Connect with the{" "}
              <CommunityAccent>
                community.
              </CommunityAccent>
            </CommunityTitle>

            <CommunityDescription>
              Join the official Regal Affluence
              WhatsApp community to connect
              with other members, receive
              updates, and stay connected with
              the Group.
            </CommunityDescription>

            {!isAccountDetailsComplete && (
              <CommunityNotice>
                <NoticeIcon>
                  !
                </NoticeIcon>

                <NoticeText>
                  Complete and save your bank
                  details above before joining
                  the community.
                </NoticeText>
              </CommunityNotice>
            )}
          </CommunityContent>

          <CommunityButton
            type="button"
            onClick={handleCommunityClick}
            $complete={isAccountDetailsComplete}
            aria-label={
              isAccountDetailsComplete
                ? "Join the Regal Affluence community"
                : "Complete and save your bank details before joining the community"
            }
          >
            {isAccountDetailsComplete
              ? "Join the community"
              : "Complete account details"}

            {isAccountDetailsComplete ? (
              <Arrow aria-hidden="true">
                →
              </Arrow>
            ) : (
              <LockIcon aria-hidden="true">
                🔒
              </LockIcon>
            )}
          </CommunityButton>
        </CommunityCard>

        <FloatingCommunityCard
          type="button"
          onClick={handleCommunityJump}
          aria-label="Scroll to the Regal Affluence community section"
        >
          <FloatingCommunityCopy>
            <FloatingCommunityEyebrow>
              REGAL AFFLUENCE COMMUNITY
            </FloatingCommunityEyebrow>
            <FloatingCommunityTitle>
              Join the Group
            </FloatingCommunityTitle>
          </FloatingCommunityCopy>

          <FloatingCommunityArrow aria-hidden="true">
            ↓
          </FloatingCommunityArrow>
        </FloatingCommunityCard>

        {communityPromptOpen && (
          <PromptOverlay
            role="presentation"
            onClick={() => setCommunityPromptOpen(false)}
          >
            <PromptCard
              role="dialog"
              aria-modal="true"
              aria-labelledby="community-prompt-title"
              onClick={(event) => event.stopPropagation()}
            >
              <PromptIcon aria-hidden="true">!</PromptIcon>
              <PromptEyebrow>Account action required</PromptEyebrow>
              <PromptTitle id="community-prompt-title">
                Finish your payment details first.
              </PromptTitle>
              <PromptText>
                Add your bank name, account name, and 10-digit account number, then save your profile.
                Your community access will unlock immediately after that.
              </PromptText>
              <PromptActions>
                <SecondaryPromptButton
                  type="button"
                  onClick={() => setCommunityPromptOpen(false)}
                >
                  Close
                </SecondaryPromptButton>
                <PrimaryPromptButton
                  type="button"
                  onClick={() => {
                    setCommunityPromptOpen(false);
                    document
                      .getElementById("additional-information")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                  }}
                >
                  Complete details
                  <Arrow aria-hidden="true">→</Arrow>
                </PrimaryPromptButton>
              </PromptActions>
            </PromptCard>
          </PromptOverlay>
        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        <ProfileFooter>
          <FooterBrand>
            REGAL AFFLUENCE GROUP
          </FooterBrand>

          <FooterText>
            Member access • Secure profile
          </FooterText>
        </ProfileFooter>
      </Container>
    </Page>
  );
};

export default Profile;

/* =========================================================
   PAGE
========================================================= */

const Page = styled.main`
  position: relative;
  min-height: 100svh;
  padding: 140px 0 80px;
  overflow: hidden;
  isolation: isolate;
  background:
    linear-gradient(135deg,
      ${({ theme }) => theme.colors.ivory} 0%,
      ${({ theme }) => theme.colors.ivory} 48%,
      #eee4f6 100%
    );
  color: ${({ theme }) => theme.colors.text};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 16% 18%, rgba(91, 33, 182, 0.06), transparent 28%),
      radial-gradient(circle at 84% 34%, rgba(201, 169, 110, 0.06), transparent 25%);
    z-index: -4;
  }

  @media (max-width: 768px) {
    padding: 115px 0 60px;
  }
`;

/* =========================================================
   GLOW
========================================================= */

const Glow = styled.div`
  position: absolute;

  top: -200px;

  right: -180px;

  width: 520px;

  height: 520px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(
        91,
        33,
        182,
        0.09
      ),
      transparent 68%
    );

  filter:
    blur(25px);

  pointer-events:
    none;
`;
/* =========================================================
   COMMUNITY PROMPT
========================================================= */

const PromptOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(32, 19, 41, 0.38);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  animation: overlayIn 0.22s ease both;

  @keyframes overlayIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const PromptCard = styled.div`
  position: relative;
  width: min(100%, 470px);
  padding: 32px;
  border: 1px solid rgba(192,57,43,0.18);
  border-radius: 24px;
  background: linear-gradient(145deg, rgba(255,252,250,0.98), rgba(248,241,239,0.97));
  box-shadow: 0 30px 90px rgba(35, 18, 27, 0.24);
  animation: promptIn 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both;

  @keyframes promptIn {
    from { opacity: 0; transform: translateY(18px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

const PromptIcon = styled.div`
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  border-radius: 14px;
  background: rgba(192,57,43,0.11);
  color: #c0392b;
  font-weight: 900;
  box-shadow: 0 0 0 7px rgba(192,57,43,0.035);
`;

const PromptEyebrow = styled.p`
  margin: 0 0 7px;
  color: #c0392b;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const PromptTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.purpleDeep};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.8rem, 4vw, 2.35rem);
  line-height: 1.02;
  letter-spacing: -0.035em;
`;

const PromptText = styled.p`
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.7;
`;

const PromptActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;

  @media (max-width: 520px) {
    flex-direction: column-reverse;
  }
`;

const SecondaryPromptButton = styled.button`
  min-height: 46px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: rgba(255,255,255,0.72);
  color: ${({ theme }) => theme.colors.text};
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.white};
  }
`;

const PrimaryPromptButton = styled.button`
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 18px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(91,33,182,0.18);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 28px rgba(91,33,182,0.23);
  }
`;


/* =========================================================
   AMBIENT ORBS
========================================================= */

const floatOrb = keyframes`
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(0, 22px, 0) scale(1.04);
  }
`;

const AmbientOrb = styled.div<{
  $position: "left" | "right";
}>`
  position: absolute;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  pointer-events: none;
  z-index: -2;
  filter: blur(8px);
  opacity: 0.72;
  animation: ${floatOrb} 8s ease-in-out infinite;
  ${({ $position }) =>
    $position === "left"
      ? `left: -190px; top: 42%; background: radial-gradient(circle, rgba(201,169,110,0.13), transparent 68%);`
      : `right: -170px; top: 11%; background: radial-gradient(circle, rgba(91,33,182,0.11), transparent 68%); animation-delay: -3s;`}
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -3;
  opacity: 0.28;
  background-image:
    linear-gradient(rgba(69,35,105,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(69,35,105,0.035) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 76%);
`;

/* =========================================================
   CONTAINER
========================================================= */

const Container = styled.div`
  position: relative;

  width:
    min(
      calc(100% - 48px),
      1120px
    );

  margin: 0 auto;

  z-index: 1;

  @media (max-width: 768px) {
    width:
      min(
        calc(100% - 32px),
        1120px
      );
  }
`;

/* =========================================================
   TOP BAR
========================================================= */

const TopBar = styled.header`
  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 30px;

  margin-bottom: 52px;

  @media (max-width: 680px) {
    align-items:
      flex-start;

    flex-direction:
      column;

    margin-bottom:
      36px;
  }
`;

const BrandArea = styled.div`
  max-width: 720px;
`;

/* =========================================================
   EYEBROW
========================================================= */

const Eyebrow = styled.p`
  display: inline-flex;

  align-items: center;

  gap: 10px;

  margin:
    0
    0
    18px;

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-size:
    10px;

  font-weight:
    800;

  letter-spacing:
    0.18em;

  line-height:
    1.4;

  text-transform:
    uppercase;

  &::before {
    content: "";

    width:
      30px;

    height:
      1px;

    flex-shrink:
      0;

    background:
      ${({ theme }) =>
        theme.colors.champagne};
  }
`;

/* =========================================================
   PAGE TITLE
========================================================= */

const PageTitle = styled.h1`
  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.text};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      3rem,
      6vw,
      5.3rem
    );

  font-weight:
    500;

  line-height:
    0.95;

  letter-spacing:
    -0.045em;
`;

const Accent = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-style:
    italic;
`;

/* =========================================================
   PAGE DESCRIPTION
========================================================= */

const PageDescription = styled.p`
  margin:
    20px
    0
    0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    15px;

  line-height:
    1.7;
`;

/* =========================================================
   LOGOUT
========================================================= */

const LogoutButton = styled.button`
  min-height:
    46px;

  padding:
    0
    20px;

  border:
    1px solid
    ${({ theme }) =>
      theme.colors.border};

  border-radius:
    ${({ theme }) =>
      theme.radius.sm};

  background:
    rgba(
      255,
      255,
      255,
      0.7
    );

  color:
    ${({ theme }) =>
      theme.colors.text};

  font-size:
    12px;

  font-weight:
    700;

  cursor:
    pointer;

  transition:
    border-color
      0.2s ease,
    background
      0.2s ease,
    transform
      0.2s ease;

  &:hover {
    border-color:
      rgba(
        91,
        33,
        182,
        0.35
      );

    background:
      ${({ theme }) =>
        theme.colors.white};

    transform:
      translateY(-1px);
  }
`;

/* =========================================================
   MEMBERSHIP CARD
========================================================= */

const MembershipCard = styled.section`
  display: flex;

  align-items:
    stretch;

  justify-content:
    space-between;

  gap: 40px;

  margin-bottom:
    28px;

  padding:
    30px;

  border:
    1px solid
    rgba(
      69,
      35,
      105,
      0.12
    );

  border-radius:
    ${({ theme }) =>
      theme.radius.lg};

  background:
    rgba(
      255,
      255,
      255,
      0.82
    );

  box-shadow:
    0
    20px
    55px
    rgba(60, 35, 82, 0.07);

  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 28px 70px rgba(60,35,82,0.1);
    border-color: rgba(201,169,110,0.28);
  }

  backdrop-filter:
    blur(12px);

  -webkit-backdrop-filter:
    blur(12px);

  @media (max-width: 820px) {
    flex-direction:
      column;
  }

  @media (max-width: 520px) {
    padding:
      22px;
  }
`;

/* =========================================================
   MEMBERSHIP MAIN
========================================================= */

const MembershipMain = styled.div`
  display: flex;

  align-items:
    center;

  gap: 20px;

  min-width:
    0;
`;

const ProfileAvatar = styled.div`
  width:
    76px;

  height:
    76px;

  flex-shrink:
    0;

  display: flex;

  align-items:
    center;

  justify-content:
    center;

  overflow:
    hidden;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.34
    );

  border-radius:
    50%;

  background:
    linear-gradient(145deg, rgba(91,33,182,0.10), rgba(201,169,110,0.16));
  box-shadow: 0 0 0 6px rgba(201,169,110,0.045);
  animation: avatarPulse 4s ease-in-out infinite;

  @keyframes avatarPulse {
    0%, 100% { box-shadow: 0 0 0 6px rgba(201,169,110,0.045); }
    50% { box-shadow: 0 0 0 10px rgba(91,33,182,0.035); }
  }
`;

const AvatarImage = styled.img`
  width:
    100%;

  height:
    100%;

  object-fit:
    cover;
`;

const AvatarInitials = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    23px;

  font-weight:
    600;
`;

const MembershipIdentity = styled.div`
  min-width:
    0;
`;

const MembershipEyebrow = styled.span`
  display:
    block;

  margin-bottom:
    5px;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    9px;

  font-weight:
    800;

  letter-spacing:
    0.18em;
`;

const MembershipName = styled.h2`
  margin:
    0;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    1.85rem;

  font-weight:
    600;

  line-height:
    1.05;

  letter-spacing:
    -0.025em;

  overflow-wrap:
    anywhere;
`;

const MembershipOccupation = styled.p`
  margin:
    7px
    0
    0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    13px;

  line-height:
    1.5;
`;

/* =========================================================
   MEMBERSHIP DETAILS
========================================================= */

const MembershipDetails = styled.div`
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(
        0,
        1fr
      )
    );

  gap:
    28px;

  min-width:
    min(
      100%,
      530px
    );

  @media (max-width: 820px) {
    width:
      100%;

    min-width:
      0;
  }

  @media (max-width: 560px) {
    grid-template-columns:
      1fr;

    gap:
      16px;
  }
`;

const MembershipItem = styled.div`
  display:
    flex;

  flex-direction:
    column;

  justify-content:
    center;

  gap:
    8px;

  min-width:
    0;
`;

const MembershipLabel = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    9px;

  font-weight:
    800;

  letter-spacing:
    0.14em;

  text-transform:
    uppercase;
`;

const MembershipValue = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.text};

  font-size:
    13px;

  font-weight:
    700;

  overflow-wrap:
    anywhere;
`;

const StatusBadge = styled.span`
  display:
    inline-flex;

  align-items:
    center;

  align-self:
    flex-start;

  gap:
    7px;

  padding:
    7px
    10px;

  border:
    1px solid
    rgba(
      42,
      145,
      92,
      0.2
    );

  border-radius:
    999px;

  background:
    rgba(
      42,
      145,
      92,
      0.07
    );

  color:
    #267e52;

  font-size:
    10px;

  font-weight:
    800;

  letter-spacing:
    0.06em;

  text-transform:
    uppercase;
`;

const StatusDot = styled.span`
  width:
    7px;

  height:
    7px;

  border-radius:
    50%;

  background:
    #2a915c;
`;

/* =========================================================
   ALERT
========================================================= */

const Alert = styled.div<{
  $type:
    | "error"
    | "success";
}>`
  margin-bottom:
    24px;

  padding:
    14px
    16px;

  border:
    1px solid
    ${({ $type }) =>
      $type === "error"
        ? "rgba(192, 57, 43, 0.2)"
        : "rgba(42, 145, 92, 0.2)"};

  border-radius:
    ${({ theme }) =>
      theme.radius.sm};

  background:
    ${({ $type }) =>
      $type === "error"
        ? "rgba(192, 57, 43, 0.06)"
        : "rgba(42, 145, 92, 0.06)"};

  color:
    ${({ $type }) =>
      $type === "error"
        ? "#c0392b"
        : "#267e52"};

  font-size:
    13px;

  line-height:
    1.55;
`;

/* =========================================================
   FORM
========================================================= */

const Form = styled.form`
  display:
    flex;

  flex-direction:
    column;

  gap:
    24px;
`;

/* =========================================================
   SECTION CARD
========================================================= */

const cardReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionCard = styled.section<{
  $featured?: boolean;
}>`
  position: relative;
  overflow: hidden;
  padding: 36px;
  border: 1px solid
    ${({ $featured }) =>
      $featured
        ? "rgba(201, 169, 110, 0.28)"
        : "rgba(69, 35, 105, 0.12)"};
  border-radius: ${({ theme }) => theme.radius.lg};
  background:
    ${({ $featured }) =>
      $featured
        ? "linear-gradient(145deg, rgba(255,252,247,0.96), rgba(247,241,235,0.9))"
        : "rgba(255,255,255,0.82)"};
  box-shadow: 0 18px 45px rgba(60, 35, 82, 0.055);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  animation: ${cardReveal} 0.65s ease both;
  transition:
    transform 0.32s ease,
    box-shadow 0.32s ease,
    border-color 0.32s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -40%;
    width: 40%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,169,110,0.9), transparent);
    animation: cardSweep 7s linear infinite;
    pointer-events: none;
  }

  @keyframes cardSweep {
    0% { transform: translateX(0); opacity: 0; }
    15% { opacity: 1; }
    45% { opacity: 1; }
    60%, 100% { transform: translateX(350%); opacity: 0; }
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 60px rgba(60,35,82,0.09);
    border-color: ${({ $featured }) =>
      $featured ? "rgba(201,169,110,0.4)" : "rgba(91,33,182,0.18)"};
  }

  @media (max-width: 768px) {
    padding: 28px;
  }

  @media (max-width: 520px) {
    padding: 22px;
  }
`;

/* =========================================================
   SECTION HEADER
========================================================= */

const SectionHeader = styled.div`
  margin-bottom:
    28px;
`;

const SectionEyebrow = styled.span`
  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  width:
    32px;

  height:
    32px;

  margin-bottom:
    14px;

  border-radius:
    50%;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.3
    );

  background:
    rgba(
      201,
      169,
      110,
      0.08
    );

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-size:
    9px;

  font-weight:
    800;

  letter-spacing:
    0.08em;
`;

const SectionTitle = styled.h2`
  margin:
    0;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      1.8rem,
      3.5vw,
      2.55rem
    );

  font-weight:
    600;

  line-height:
    1.05;

  letter-spacing:
    -0.03em;
`;

const SectionDescription = styled.p`
  max-width:
    650px;

  margin:
    10px
    0
    0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    13px;

  line-height:
    1.65;
`;

/* =========================================================
   INFO GRID
========================================================= */

const InfoGrid = styled.div`
  display:
    grid;

  grid-template-columns:
    repeat(
      2,
      minmax(
        0,
        1fr
      )
    );

  gap:
    22px;

  @media (max-width: 680px) {
    grid-template-columns:
      1fr;

    gap:
      18px;
  }
`;

/* =========================================================
   FULL WIDTH
========================================================= */

const FullWidth = styled.div`
  grid-column:
    1 / -1;
`;

/* =========================================================
   READ ONLY FIELD
========================================================= */

const ReadOnlyField = styled.div`
  min-height:
    78px;

  display:
    flex;

  flex-direction:
    column;

  justify-content:
    center;

  gap:
    8px;

  padding:
    15px
    16px;

  border:
    1px solid
    rgba(
      69,
      35,
      105,
      0.09
    );

  border-radius:
    ${({ theme }) =>
      theme.radius.sm};

  background:
    rgba(
      250,
      248,
      243,
      0.72
    );
`;

const ReadOnlyLabel = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    9px;

  font-weight:
    800;

  letter-spacing:
    0.13em;

  text-transform:
    uppercase;
`;

const ReadOnlyValue = styled.span<{
  $highlight?: boolean;
}>`
  color:
    ${({ theme }) =>
      theme.colors.text};

  font-size:
    14px;

  font-weight:
    ${({ $highlight }) =>
      $highlight
        ? 800
        : 600};

  overflow-wrap:
    anywhere;

  ${({ $highlight, theme }) =>
    $highlight
      ? `
        color: ${theme.colors.purple};
        font-family: "SFMono-Regular",
          Consolas,
          "Liberation Mono",
          monospace;
        letter-spacing: 0.04em;
      `
      : ""}
`;

const ReadOnlyLongValue = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.text};

  font-size:
    13px;

  font-weight:
    500;

  line-height:
    1.7;

  white-space:
    pre-wrap;

  overflow-wrap:
    anywhere;
`;

/* =========================================================
   STATUS BOX
========================================================= */

const StatusBox = styled.div`
  display:
    inline-flex;

  align-items:
    center;

  align-self:
    flex-start;

  gap:
    8px;

  padding:
    7px
    10px;

  border:
    1px solid
    rgba(
      42,
      145,
      92,
      0.2
    );

  border-radius:
    999px;

  background:
    rgba(
      42,
      145,
      92,
      0.07
    );

  color:
    #267e52;

  font-size:
    10px;

  font-weight:
    800;

  letter-spacing:
    0.06em;

  text-transform:
    uppercase;
`;

/* =========================================================
   FIELD GROUP
========================================================= */

const FieldGroup = styled.div`
  display:
    flex;

  flex-direction:
    column;

  gap:
    9px;
`;

/* =========================================================
   LABEL
========================================================= */

const Label = styled.label`
  color:
    ${({ theme }) =>
      theme.colors.text};

  font-size:
    11px;

  font-weight:
    800;

  letter-spacing:
    0.05em;
`;

/* =========================================================
   OPTIONAL LABEL
========================================================= */

const Optional = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 500;
`;

/* =========================================================
   INPUT
========================================================= */

const Input = styled.input`
  width:
    100%;

  min-height:
    52px;

  padding:
    0
    15px;

  border:
    1px solid
    ${({ theme }) =>
      theme.colors.border};

  border-radius:
    ${({ theme }) =>
      theme.radius.sm};

  background:
    rgba(
      250,
      248,
      243,
      0.9
    );

  color:
    ${({ theme }) =>
      theme.colors.text};

  font-size:
    14px;

  outline:
    none;

  transition:
    border-color
      0.2s ease,
    background
      0.2s ease,
    box-shadow
      0.2s ease;

  &::placeholder {
    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    opacity:
      0.65;
  }

  &:hover {
    border-color: rgba(91, 33, 182, 0.24);
    transform: translateY(-1px);
  }

  &:focus {
    border-color:
      ${({ theme }) =>
        theme.colors.purple};

    background:
      ${({ theme }) =>
        theme.colors.white};

    box-shadow:
      0
      0
      0 3px
      rgba(
        91,
        33,
        182,
        0.08
      );
  }
`;

/* =========================================================
   FIELD HINT
========================================================= */

const FieldHint = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    11px;

  line-height:
    1.5;
`;

/* =========================================================
   SECURITY NOTE
========================================================= */

const SecurityNote = styled.div`
  display:
    flex;

  align-items:
    flex-start;

  gap:
    12px;

  margin-top:
    28px;

  padding:
    15px
    16px;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.2
    );

  border-radius:
    ${({ theme }) =>
      theme.radius.sm};

  background:
    rgba(
      201,
      169,
      110,
      0.06
    );
`;

const SecurityIcon = styled.span`
  width:
    23px;

  height:
    23px;

  flex-shrink:
    0;

  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  border-radius:
    50%;

  background:
    rgba(
      201,
      169,
      110,
      0.12
    );

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-size:
    11px;

  font-weight:
    800;
`;

const SecurityText = styled.p`
  margin:
    0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    11px;

  line-height:
    1.65;
`;

/* =========================================================
   SAVE AREA
========================================================= */

const SaveArea = styled.div`
  display:
    flex;

  justify-content:
    flex-end;

  margin-top:
    30px;

  @media (max-width: 520px) {
    justify-content:
      stretch;
  }
`;

/* =========================================================
   PRIMARY BUTTON
========================================================= */

const PrimaryButton = styled.button`
  min-height:
    54px;

  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    12px;

  padding:
    0
    22px;

  border:
    none;

  border-radius:
    ${({ theme }) =>
      theme.radius.sm};

  background:
    ${({ theme }) =>
      theme.colors.purple};

  color:
    ${({ theme }) =>
      theme.colors.white};

  font-size:
    12px;

  font-weight:
    800;

  letter-spacing:
    0.03em;

  cursor:
    pointer;

  box-shadow:
    0
    12px
    30px
    rgba(
      91,
      33,
      182,
      0.16
    );

  transition:
    transform
      0.2s ease,
    box-shadow
      0.2s ease;

  &:hover {
    transform:
      translateY(-2px);

    box-shadow:
      0
      16px
      36px
      rgba(
        91,
        33,
        182,
        0.21
      );
  }
`;

const SaveButton = styled.button`
  min-height:
    54px;

  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    12px;

  padding:
    0
    24px;

  border:
    none;

  border-radius:
    ${({ theme }) =>
      theme.radius.sm};

  background:
    ${({ theme }) =>
      theme.colors.purple};

  color:
    ${({ theme }) =>
      theme.colors.white};

  font-size:
    12px;

  font-weight:
    800;

  letter-spacing:
    0.03em;

  cursor:
    pointer;

  box-shadow:
    0
    12px
    30px
    rgba(
      91,
      33,
      182,
      0.16
    );

  transition:
    transform
      0.2s ease,
    box-shadow
      0.2s ease,
    opacity
      0.2s ease;

  &:hover:not(:disabled) {
    transform:
      translateY(-2px);

    box-shadow:
      0
      16px
      36px
      rgba(
        91,
        33,
        182,
        0.21
      );
  }

  &:disabled {
    opacity:
      0.5;

    cursor:
      not-allowed;

    box-shadow:
      none;
  }

  &:focus-visible {
    outline:
      2px solid
      ${({ theme }) =>
        theme.colors.champagne};

    outline-offset:
      4px;
  }

  @media (max-width: 520px) {
    width:
      100%;
  }
`;

/* =========================================================
   ARROW
========================================================= */

const Arrow = styled.span`
  font-size:
    18px;

  line-height:
    1;
`;

/* =========================================================
   COMMUNITY CARD
========================================================= */

const CommunityCard = styled.section<{
  $complete: boolean;
}>`
  position: relative;
  scroll-margin-top: 28px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 24px;
  padding: 34px;
  border: 1px solid
    ${({ $complete }) =>
      $complete
        ? "rgba(201,169,110,0.32)"
        : "rgba(192,57,43,0.22)"};
  border-radius: ${({ theme }) => theme.radius.lg};
  background:
    ${({ $complete }) =>
      $complete
        ? "linear-gradient(135deg, rgba(255,252,247,0.97), rgba(247,241,235,0.92))"
        : "linear-gradient(135deg, rgba(255,249,247,0.96), rgba(255,255,255,0.86))"};
  box-shadow:
    0 18px 45px rgba(60,35,82,0.055),
    inset 0 1px 0 rgba(255,255,255,0.72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &::after {
    content: "";
    position: absolute;
    width: 160px;
    height: 160px;
    right: -60px;
    top: -70px;
    border-radius: 50%;
    background:
      ${({ $complete }) =>
        $complete
          ? "radial-gradient(circle, rgba(201,169,110,0.16), transparent 70%)"
          : "radial-gradient(circle, rgba(192,57,43,0.10), transparent 70%)"};
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 26px 62px rgba(60,35,82,0.09);
  }

  @media (max-width: 760px) {
    align-items: flex-start;
    flex-direction: column;
    padding: 28px;
  }

  @media (max-width: 520px) {
    padding: 22px;
  }
`;

/* =========================================================
   COMMUNITY CONTENT
========================================================= */

const FloatingCommunityCard = styled.button`
  position: fixed;
  right: 26px;
  bottom: 26px;
  z-index: 900;
  display: flex;
  align-items: center;
  gap: 22px;
  min-width: 238px;
  padding: 14px 16px 14px 18px;
  border: 1px solid rgba(201,169,110,0.38);
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(43,20,60,0.97), rgba(69,35,105,0.96));
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
  box-shadow: 0 18px 45px rgba(35,18,48,0.22), 0 0 0 1px rgba(255,255,255,0.04) inset;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(201,169,110,0.65);
    box-shadow: 0 24px 55px rgba(35,18,48,0.28), 0 0 0 1px rgba(255,255,255,0.05) inset;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.champagne};
    outline-offset: 4px;
  }

  @media (max-width: 600px) {
    right: 14px;
    bottom: calc(14px + env(safe-area-inset-bottom));
    left: 14px;
    width: auto;
    min-width: 0;
    justify-content: space-between;
    border-radius: 16px;
  }
`;

const FloatingCommunityCopy = styled.span`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const FloatingCommunityEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.champagne};
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.16em;
  line-height: 1.2;
`;

const FloatingCommunityTitle = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
`;

const FloatingCommunityArrow = styled.span`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(201,169,110,0.38);
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.champagne};
  font-size: 17px;
  line-height: 1;
`;

/* =========================================================
   COMMUNITY CONTENT
========================================================= */

const CommunityContent = styled.div`
  min-width:
    0;

  flex:
    1;
`;

const CommunityEyebrow = styled.span`
  display:
    inline-block;

  margin-bottom:
    12px;

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-size:
    9px;

  font-weight:
    800;

  letter-spacing:
    0.18em;

  text-transform:
    uppercase;
`;

const CommunityTitle = styled.h2`
  margin:
    0;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      1.9rem,
      4vw,
      2.8rem
    );

  font-weight:
    600;

  line-height:
    1.05;

  letter-spacing:
    -0.035em;
`;

const CommunityAccent = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-style:
    italic;
`;

const CommunityDescription = styled.p`
  max-width:
    650px;

  margin:
    13px
    0
    0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    13px;

  line-height:
    1.7;
`;

/* =========================================================
   COMMUNITY NOTICE
========================================================= */

const CommunityNotice = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 650px;
  margin-top: 18px;
  padding: 13px 14px;
  border: 1px solid rgba(192, 57, 43, 0.24);
  border-radius: ${({ theme }) => theme.radius.sm};
  background: rgba(192, 57, 43, 0.075);
  box-shadow: 0 8px 26px rgba(192,57,43,0.055);
  animation: noticePulse 2.8s ease-in-out infinite;

  @keyframes noticePulse {
    0%, 100% { box-shadow: 0 8px 26px rgba(192,57,43,0.05); }
    50% { box-shadow: 0 10px 30px rgba(192,57,43,0.11); }
  }
`;

const NoticeIcon = styled.span`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(192,57,43,0.14);
  color: #c0392b;
  font-size: 11px;
  font-weight: 900;
  box-shadow: 0 0 0 4px rgba(192,57,43,0.05);
`;

const NoticeText = styled.span`
  color: #b33224;
  font-size: 11px;
  font-weight: 800;
  line-height: 1.6;
  letter-spacing: 0.01em;
`;

/* =========================================================
   COMMUNITY BUTTON
========================================================= */

const CommunityButton = styled.button<{
  $complete: boolean;
}>`
  min-height: 54px;
  min-width: 190px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 22px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $complete, theme }) =>
    $complete ? theme.colors.purple : "#d7a198"};
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.03em;
  cursor: pointer;
  box-shadow: ${({ $complete }) =>
    $complete
      ? "0 12px 30px rgba(91,33,182,0.16)"
      : "0 10px 25px rgba(192,57,43,0.12)"};
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ $complete }) =>
      $complete ? "#5b21b6" : "#c97f73"};
    box-shadow: ${({ $complete }) =>
      $complete
        ? "0 17px 38px rgba(91,33,182,0.23)"
        : "0 15px 34px rgba(192,57,43,0.18)"};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.champagne};
    outline-offset: 4px;
  }

  @media (max-width: 760px) {
    width: 100%;
  }
`;

const LockIcon = styled.span`
  font-size:
    13px;

  line-height:
    1;
`;

/* =========================================================
   PROFILE FOOTER
========================================================= */

const ProfileFooter = styled.footer`
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    20px;

  margin-top:
    34px;

  padding-top:
    24px;

  border-top:
    1px solid
    rgba(
      69,
      35,
      105,
      0.09
    );

  @media (max-width: 560px) {
    align-items:
      flex-start;

    flex-direction:
      column;
  }
`;

const FooterBrand = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-size:
    9px;

  font-weight:
    800;

  letter-spacing:
    0.14em;
`;

const FooterText = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    10px;

  letter-spacing:
    0.03em;
`;

/* =========================================================
   LOADING
========================================================= */

const LoadingContainer = styled.div`
  min-height:
    70svh;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  flex-direction:
    column;

  gap:
    18px;
`;

const LoadingSpinner = styled.div`
  width:
    38px;

  height:
    38px;

  border:
    2px solid
    rgba(
      91,
      33,
      182,
      0.12
    );

  border-top-color:
    ${({ theme }) =>
      theme.colors.purple};

  border-radius:
    50%;

  animation:
    spin
    0.8s
    linear
    infinite;

  @keyframes spin {
    to {
      transform:
        rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  margin:
    0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    13px;
`;

/* =========================================================
   ERROR CARD
========================================================= */

const ErrorCard = styled.section`
  max-width:
    640px;

  margin:
    60px
    auto
    0;

  padding:
    44px;

  text-align:
    center;

  border:
    1px solid
    rgba(
      69,
      35,
      105,
      0.12
    );

  border-radius:
    ${({ theme }) =>
      theme.radius.lg};

  background:
    rgba(
      255,
      255,
      255,
      0.82
    );

  box-shadow:
    0
    20px
    55px
    rgba(
      60,
      35,
      82,
      0.07
    );

  ${Eyebrow} {
    justify-content:
      center;
  }

  @media (max-width: 520px) {
    padding:
      28px
      22px;
  }
`;

const ErrorTitle = styled.h1`
  margin:
    0;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      2rem,
      5vw,
      3rem
    );

  font-weight:
    600;

  line-height:
    1.05;

  letter-spacing:
    -0.035em;
`;

const ErrorText = styled.p`
  max-width:
    480px;

  margin:
    18px
    auto
    28px;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    14px;

  line-height:
    1.7;
`;