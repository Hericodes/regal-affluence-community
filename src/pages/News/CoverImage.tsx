import { useState } from "react";
import styled from "styled-components";

/* =========================================================
   COVER IMAGE
   Fixed aspect ratio with a branded fallback when a post
   has no image or the image fails to load.
========================================================= */

interface CoverImageProps {
  src: string | null;
  alt: string;
  ratio?: string;
  eager?: boolean;
  className?: string;
}

const CoverImage = ({
  src,
  alt,
  ratio = "16 / 10",
  eager = false,
  className,
}: CoverImageProps) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;

  return (
    <Frame $ratio={ratio} className={className}>
      {showImage ? (
        <Image
          src={src as string}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <Fallback aria-hidden="true">
          <span>Regal Affluence</span>
        </Fallback>
      )}
    </Frame>
  );
};

export default CoverImage;

const Frame = styled.div<{ $ratio: string }>`
  position: relative;

  width: 100%;

  aspect-ratio: ${({ $ratio }) => $ratio};

  overflow: hidden;

  background: ${({ theme }) => theme.colors.cream};
`;

const Image = styled.img`
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Fallback = styled.div`
  position: absolute;
  inset: 0;

  display: grid;
  place-items: center;

  background:
    radial-gradient(
      circle at 75% 20%,
      rgba(201, 169, 110, 0.18),
      transparent 55%
    ),
    ${({ theme }) => theme.colors.purpleDeep};

  span {
    color: ${({ theme }) => theme.colors.champagneLight};

    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(1rem, 2vw, 1.35rem);
    font-style: italic;
    letter-spacing: 0.02em;
  }
`;
