import {
  useEffect,
  useState,
} from "react";

import styled, {
  keyframes,
} from "styled-components";

/* ========================================
   PROPS
======================================== */

interface BrandIntroProps {
  onComplete: () => void;
}

/* ========================================
   ANIMATIONS
======================================== */

const handLeftEnter = keyframes`
  0% {
    transform:
      translate3d(-110%, 18px, 0)
      rotate(-12deg);

    opacity: 0;
  }

  30% {
    opacity: 1;
  }

  100% {
    transform:
      translate3d(0, 0, 0)
      rotate(0deg);

    opacity: 1;
  }
`;

const handRightEnter = keyframes`
  0% {
    transform:
      translate3d(110%, 18px, 0)
      rotate(12deg);

    opacity: 0;
  }

  30% {
    opacity: 1;
  }

  100% {
    transform:
      translate3d(0, 0, 0)
      rotate(0deg);

    opacity: 1;
  }
`;

const connectionPulse = keyframes`
  0% {
    transform:
      translate(-50%, -50%)
      scale(0.2);

    opacity: 0;
  }

  45% {
    transform:
      translate(-50%, -50%)
      scale(1);

    opacity: 1;
  }

  100% {
    transform:
      translate(-50%, -50%)
      scale(1.8);

    opacity: 0;
  }
`;

const glowPulse = keyframes`
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.9);
  }

  50% {
    opacity: 0.55;
    transform: scale(1.08);
  }
`;

const logoReveal = keyframes`
  0% {
    opacity: 0;

    transform:
      translateY(18px)
      scale(0.92);

    filter:
      blur(8px)
      brightness(0.7);
  }

  70% {
    opacity: 1;

    transform:
      translateY(0)
      scale(1);

    filter:
      blur(0)
      brightness(1.15);
  }

  100% {
    opacity: 1;

    transform:
      translateY(0)
      scale(1);

    filter:
      blur(0)
      brightness(1);
  }
`;

const taglineReveal = keyframes`
  from {
    opacity: 0;

    transform:
      translateY(10px);

    letter-spacing: 0.38em;
  }

  to {
    opacity: 1;

    transform:
      translateY(0);

    letter-spacing: 0.22em;
  }
`;

const networkExpand = keyframes`
  0% {
    opacity: 0;

    transform:
      translate(-50%, -50%)
      scale(0.4);
  }

  35% {
    opacity: 0.45;
  }

  100% {
    opacity: 0;

    transform:
      translate(-50%, -50%)
      scale(1.8);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;

    visibility: hidden;

    pointer-events: none;
  }
`;

/* ========================================
   COMPONENT
======================================== */

const BrandIntro = ({
  onComplete,
}: BrandIntroProps) => {
  const [exiting, setExiting] =
    useState(false);

  useEffect(() => {
    const exitTimer =
      window.setTimeout(() => {
        setExiting(true);
      }, 3000);

    const completeTimer =
      window.setTimeout(() => {
        onComplete();
      }, 3550);

    return () => {
      window.clearTimeout(
        exitTimer
      );

      window.clearTimeout(
        completeTimer
      );
    };
  }, [onComplete]);

  return (
    <Overlay
      $exiting={exiting}
      aria-hidden="true"
    >
      {/* ==================================
          ATMOSPHERE
      ================================== */}

      <Ambient />

      <Grid />

      <Glow />

      {/* ==================================
          HANDS / CONNECTION
      ================================== */}

      <Hands>

        {/* LEFT HAND */}

        <HandLeft>
          <svg
            viewBox="0 0 420 260"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="leftHandGradient"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop
                  offset="0%"
                  stopColor="#241044"
                  stopOpacity="0"
                />

                <stop
                  offset="52%"
                  stopColor="#6B4290"
                  stopOpacity="0.72"
                />

                <stop
                  offset="100%"
                  stopColor="#C9A96E"
                  stopOpacity="0.95"
                />
              </linearGradient>
            </defs>

            <path
              d="
                M12 180
                C54 165 86 144 118 118
                C147 95 172 76 202 74
                C226 72 245 84 250 98
                C256 114 247 128 231 137
                C214 146 195 152 183 166
                C171 180 166 199 153 216
                C136 238 108 246 80 240
                C49 233 26 210 12 180Z
              "
              fill="url(#leftHandGradient)"
            />

            <path
              d="
                M200 75
                C215 50 230 35 243 29
                C254 24 264 28 266 36
                C268 44 263 53 256 61
                L229 96
              "
              fill="none"
              stroke="#E4D2A8"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.55"
            />

            <path
              d="
                M223 90
                C240 67 256 55 269 51
                C278 48 287 52 288 60
                C289 67 284 74 277 81
                L251 108
              "
              fill="none"
              stroke="#D8C393"
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.46"
            />
          </svg>
        </HandLeft>

        {/* RIGHT HAND */}

        <HandRight>
          <svg
            viewBox="0 0 420 260"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="rightHandGradient"
                x1="100%"
                y1="50%"
                x2="0%"
                y2="50%"
              >
                <stop
                  offset="0%"
                  stopColor="#241044"
                  stopOpacity="0"
                />

                <stop
                  offset="52%"
                  stopColor="#6B4290"
                  stopOpacity="0.72"
                />

                <stop
                  offset="100%"
                  stopColor="#C9A96E"
                  stopOpacity="0.95"
                />
              </linearGradient>
            </defs>

            <path
              d="
                M408 180
                C366 165 334 144 302 118
                C273 95 248 76 218 74
                C194 72 175 84 170 98
                C164 114 173 128 189 137
                C206 146 225 152 237 166
                C249 180 254 199 267 216
                C284 238 312 246 340 240
                C371 233 394 210 408 180Z
              "
              fill="url(#rightHandGradient)"
            />

            <path
              d="
                M220 75
                C205 50 190 35 177 29
                C166 24 156 28 154 36
                C152 44 157 53 164 61
                L191 96
              "
              fill="none"
              stroke="#E4D2A8"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.55"
            />

            <path
              d="
                M197 90
                C180 67 164 55 151 51
                C142 48 133 52 132 60
                C131 67 136 74 143 81
                L169 108
              "
              fill="none"
              stroke="#D8C393"
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.46"
            />
          </svg>
        </HandRight>

        {/* ==================================
            CONNECTION POINT
        ================================== */}

        <ConnectionPoint />

        <ConnectionRing />

        <NetworkRing />

      </Hands>

      {/* ==================================
          BRAND REVEAL
      ================================== */}

      <Brand>

        <Logo
          src={`${import.meta.env.BASE_URL}images/regal-affluence-logo.png`}
          alt="Regal Affluence"
        />

        <Tagline>
          BUILD. CONNECT. ELEVATE.
        </Tagline>

      </Brand>
    </Overlay>
  );
};

export default BrandIntro;

/* ========================================
   OVERLAY
======================================== */

const Overlay = styled.div<{
  $exiting: boolean;
}>`
  position: fixed;

  inset: 0;

  z-index: 9999;

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;

  background:
    radial-gradient(
      circle at center,
      #32105f 0%,
      #1e0a3c 48%,
      #0d061b 100%
    );

  animation:
    ${({ $exiting }) =>
      $exiting
        ? fadeOut + " 0.55s ease forwards"
        : "none"};

  isolation: isolate;

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    & *,
    & *::before,
    & *::after {
      animation-duration:
        0.01ms !important;

      animation-delay:
        0ms !important;

      animation-iteration-count:
        1 !important;

      transition: none !important;
    }
  }
`;

/* ========================================
   AMBIENT
======================================== */

const Ambient = styled.div`
  position: absolute;

  inset: 0;

  background:
    radial-gradient(
      circle at 50% 52%,
      rgba(
        124,
        58,
        237,
        0.16
      ),
      transparent 28%
    ),
    radial-gradient(
      circle at 20% 50%,
      rgba(
        201,
        169,
        110,
        0.04
      ),
      transparent 28%
    ),
    radial-gradient(
      circle at 80% 50%,
      rgba(
        201,
        169,
        110,
        0.04
      ),
      transparent 28%
    );

  pointer-events: none;
`;

/* ========================================
   GRID
======================================== */

const Grid = styled.div`
  position: absolute;

  inset: 0;

  opacity: 0.22;

  background-image:
    linear-gradient(
      rgba(
        255,
        255,
        255,
        0.022
      ) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(
        255,
        255,
        255,
        0.022
      ) 1px,
      transparent 1px
    );

  background-size:
    80px 80px;

  mask-image:
    radial-gradient(
      circle at center,
      black,
      transparent 72%
    );

  pointer-events: none;
`;

/* ========================================
   GLOW
======================================== */

const Glow = styled.div`
  position: absolute;

  width: 360px;

  height: 360px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(
        124,
        58,
        237,
        0.18
      ),
      transparent 68%
    );

  filter: blur(18px);

  animation:
    ${glowPulse}
    4s
    ease-in-out
    infinite;

  pointer-events: none;
`;

/* ========================================
   HANDS
======================================== */

const Hands = styled.div`
  position: absolute;

  inset: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  pointer-events: none;
`;

/* ========================================
   LEFT HAND
======================================== */

const HandLeft = styled.div`
  position: absolute;

  left: 4%;

  width:
    min(
      42vw,
      520px
    );

  animation:
    ${handLeftEnter}
    1.65s
    cubic-bezier(
      0.16,
      1,
      0.3,
      1
    )
    forwards;

  svg {
    display: block;

    width: 100%;

    height: auto;
  }

  @media (max-width: 700px) {
    left: -8%;

    width: 72vw;
  }
`;

/* ========================================
   RIGHT HAND
======================================== */

const HandRight = styled.div`
  position: absolute;

  right: 4%;

  width:
    min(
      42vw,
      520px
    );

  animation:
    ${handRightEnter}
    1.65s
    cubic-bezier(
      0.16,
      1,
      0.3,
      1
    )
    forwards;

  svg {
    display: block;

    width: 100%;

    height: auto;
  }

  @media (max-width: 700px) {
    right: -8%;

    width: 72vw;
  }
`;

/* ========================================
   CONNECTION POINT
======================================== */

const ConnectionPoint =
  styled.div`
    position: absolute;

    left: 50%;

    top: 50%;

    width: 9px;

    height: 9px;

    border-radius: 50%;

    background:
      ${({ theme }) =>
        theme.colors.champagneLight};

    box-shadow:
      0 0 10px
        rgba(
          228,
          210,
          168,
          0.8
        ),
      0 0 35px
        rgba(
          201,
          169,
          110,
          0.5
        );

    transform:
      translate(
        -50%,
        -50%
      )
      scale(0);

    opacity: 0;

    animation:
      ${connectionPulse}
      1.1s
      1.5s
      ease-out
      forwards;
  `;

/* ========================================
   CONNECTION RING
======================================== */

const ConnectionRing =
  styled.div`
    position: absolute;

    left: 50%;

    top: 50%;

    width: 120px;

    height: 120px;

    border:
      1px solid
      rgba(
        201,
        169,
        110,
        0.42
      );

    border-radius: 50%;

    transform:
      translate(
        -50%,
        -50%
      )
      scale(0.3);

    opacity: 0;

    animation:
      ${networkExpand}
      1.4s
      1.55s
      ease-out
      forwards;
  `;

/* ========================================
   NETWORK RING
======================================== */

const NetworkRing =
  styled.div`
    position: absolute;

    left: 50%;

    top: 50%;

    width: 240px;

    height: 240px;

    border:
      1px solid
      rgba(
        124,
        58,
        237,
        0.18
      );

    border-radius: 50%;

    transform:
      translate(
        -50%,
        -50%
      )
      scale(0.3);

    opacity: 0;

    animation:
      ${networkExpand}
      1.8s
      1.65s
      ease-out
      forwards;
  `;

/* ========================================
   BRAND
======================================== */

const Brand = styled.div`
  position: relative;

  z-index: 5;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  pointer-events: none;
`;

/* ========================================
   LOGO
======================================== */

const Logo =
  styled.img`
    display: block;

    width:
      min(
        270px,
        58vw
      );

    height: auto;

    object-fit: contain;

    opacity: 0;

    animation:
      ${logoReveal}
      1s
      2.05s
      cubic-bezier(
        0.16,
        1,
        0.3,
        1
      )
      forwards;

    filter:
      drop-shadow(
        0
        12px
        28px
        rgba(
          0,
          0,
          0,
          0.32
        )
      );

    @media (max-width: 500px) {
      width: 220px;
    }
  `;

/* ========================================
   TAGLINE
======================================== */

const Tagline =
  styled.span`
    margin-top: 20px;

    color:
      rgba(
        228,
        210,
        168,
        0.78
      );

    font-family:
      ${({ theme }) =>
        theme.fonts.body};

    font-size: 9px;

    font-weight: 700;

    letter-spacing: 0.22em;

    opacity: 0;

    animation:
      ${taglineReveal}
      0.8s
      2.45s
      ease
      forwards;

    @media (max-width: 500px) {
      margin-top: 15px;

      font-size: 7px;

      letter-spacing: 0.18em;
    }
  `;