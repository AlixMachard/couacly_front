import { useState } from "react";
import { Row, Col } from "antd";
import axios from 'axios';
import { Button } from "../../common/Button";
import { AuthFormContainer, Input, AuthFormHeader, AuthFormDescription, StyledFormGroup, InputContainer, Label ,ToggleButton, ButtonContainer, ContentWrapper } from "./styles";

interface AuthFormProps {
  isCreatingAccount: boolean;
  toggleForm: () => void;
}


const API_URL = "http://localhost:8000";

const AuthForm: React.FC<AuthFormProps> = ({ isCreatingAccount, toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isCreatingAccount) {
        await axios.post(`${API_URL}/users/`, {
          full_name: fullName,
          email,
          password,
        });        
        alert("Account created successfully!");
      } else {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        localStorage.setItem("token", response.data.access_token);
        alert("Signed in successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  }
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
                <Button name="submit">
                    {isCreatingAccount ? "Create Account" : "Sign In"}
                </Button>
              </ButtonContainer>
            </StyledFormGroup>
            <ToggleButton onClick={toggleForm}>
              {isCreatingAccount ? "Already have an account? Sign In" : "New user? Create an Account"}
            </ToggleButton>
          </ContentWrapper>
        </Row>
      </AuthFormContainer>
    );
  };
  
  export default AuthForm;