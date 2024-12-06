import { lazy, useState } from "react";
import AuthForm from "../../components/AuthForm";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const SignIn = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const toggleForm = () => setIsCreatingAccount((prevState) => !prevState);

  return (
    <Container>
      <ScrollToTop />
      <AuthForm isCreatingAccount={isCreatingAccount} toggleForm={toggleForm} />
    </Container>
  );
};

export default SignIn;
