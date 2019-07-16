import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #4267b2;
`;
export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  max-width: 350px;
`;
export const Form = styled.form`
  width: 100%;
  margin-top: 10px;
`;

export const Dev = styled.span`
  margin-top: 10px;
  font-size: 11px;
`;
export const MessageError = styled.span`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 11px;
  color: #b71c1c;
`;
