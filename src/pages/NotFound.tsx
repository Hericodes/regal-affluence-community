import { Link } from "react-router-dom";

import useDocumentMeta from "../hooks/useDocumentMeta";
import {
  Container,
  PrimaryButton,
  Section,
  StatusPanel,
} from "./News/News.styles";

/* =========================================================
   NOT FOUND
========================================================= */

const NotFound = () => {
  useDocumentMeta({ title: "Page not found", noIndex: true });

  return (
    <Section>
      <Container>
        <StatusPanel>
          <h1>Page not found</h1>
          <p>
            The page you are looking for doesn't exist or has been
            moved.
          </p>
          <PrimaryButton as={Link} to="/">
            Back to home
          </PrimaryButton>
        </StatusPanel>
      </Container>
    </Section>
  );
};

export default NotFound;
