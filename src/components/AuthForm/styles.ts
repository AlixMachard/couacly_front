import styled from "styled-components";

export const ContactContainer = styled("div")`
  padding: 5rem 0;

  @media only screen and (max-width: 1024px) {
    padding: 3rem 0;
  }
`;

export const FormGroup = styled("form")`
  width: 100%;
  max-width: 520px;

  @media only screen and (max-width: 1045px) {
    max-width: 100%;
    margin-top: 2rem;
  }
`;

export const Span = styled("span")`
  display: block;
  font-weight: 600;
  color: rgb(255, 0, 161);
  height: 0.775rem;
  padding: 0 0.675rem;
`;

export const ButtonContainer = styled("div")`
  text-align: end;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 414px) {
    padding-top: 0.75rem;
  }
`;

export const ContentWrapper = styled("div")`
  max-width: 570px;

  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

  // Styled components
export const AuthFormContainer = styled.div`

  position: relative;
  
  text-align: center;
  @media only screen and (max-width: 1024px) {
    padding: 3rem 0;
  }
  `;

export const AuthFormHeader = styled.h1`
    margin-bottom: 1rem;
    text-align: center;

    
  `;
  
export const AuthFormDescription = styled.p`
    margin-bottom: 2rem;
    text-align: center;
  `;
  
export const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    text-align: left;
  `;
  
export const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  `;
  
export const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    
  
    &:focus {
      outline: none;
      border-color: #007bff;
    }
  `;
  
export const ToggleButton = styled.button`
    margin-top: 1rem;
    background-color: transparent;
    color: #007bff;
    border: none;
    cursor: pointer;
  `;
  
export const StyledFormGroup = styled("form")`
    width: 100%;
    text-align: center;

  
    @media only screen and (max-width: 1045px) {
      max-width: 100%;
      margin-top: 2rem;
    }
  `;
