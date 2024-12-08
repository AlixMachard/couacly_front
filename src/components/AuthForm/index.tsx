import { useState } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import { Button } from "../../common/Button";
import {
  AuthFormContainer,
  Input,
  AuthFormHeader,
  AuthFormDescription,
  StyledFormGroup,
  InputContainer,
  Label,
  ToggleButton,
  ButtonContainer,
  ContentWrapper,
} from "./styles";
import Swal from 'sweetalert2';


interface AuthFormProps {
  isCreatingAccount: boolean;
  toggleForm: () => void;
}

const API_URL = "http://localhost:8080";

const AuthForm: React.FC<AuthFormProps> = ({ isCreatingAccount, toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false); // Optional loading state

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Show loading if required

    try {
      if (isCreatingAccount) {
        // Create a new account
        const response = await axios.post(`${API_URL}/users/`, {
          full_name: fullName,
          email,
          password,
        });
        localStorage.setItem("token", response.data.access_token);
        Swal.fire({
          title: "Account created successfully !",
          icon: "success",
          confirmButtonText: 'Go to home',
        }).then(function() {
          window.location.href = "/";
        });
      } else {
        // Log in and store the token
        const response = await axios.post(`${API_URL}/login/`, { email, password });
        const { access_token } = response.data;
        localStorage.setItem("token", access_token);
        Swal.fire({
          title: "You successfully logged in !",
          icon: "success",
          confirmButtonText: 'Go to home',
        }).then(function() {
          window.location.href = "/";
        });
      
      }
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.detail || "An error occurred. Please try again.";
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again later.',
          confirmButtonText: 'Okay',
      });
    } finally {
      setLoading(false); // Hide loading
    }
  };

  return (
    <AuthFormContainer>
      <Row justify="center" align="middle">
        <ContentWrapper>
          <AuthFormHeader>
            {isCreatingAccount ? "Create an Account" : "Sign In to Your Account"}
          </AuthFormHeader>
          <AuthFormDescription>
            {isCreatingAccount
              ? "Fill in the details below to create a new account."
              : "Enter your credentials to access your account."}
          </AuthFormDescription>
          <StyledFormGroup onSubmit={handleSubmit}>
            {isCreatingAccount && (
              <InputContainer>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </InputContainer>
            )}
            <InputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            <ButtonContainer>
              <Button name="submit" onClick={() => !loading && handleSubmit}>
                {loading
                  ? "Processing..."
                  : isCreatingAccount
                  ? "Create Account"
                  : "Sign In"}
              </Button>
            </ButtonContainer>
          </StyledFormGroup>
          <ToggleButton onClick={toggleForm}>
            {isCreatingAccount
              ? "Already have an account? Sign In"
              : "New user? Create an Account"}
          </ToggleButton>
        </ContentWrapper>
      </Row>
    </AuthFormContainer>
  );
};

export default AuthForm;
