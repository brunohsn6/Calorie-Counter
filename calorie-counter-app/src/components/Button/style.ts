import styled from "styled-components";

export const Button = styled.button<{ fullsize?: boolean }>`
  width: ${(props) => (props.fullsize ? "100%" : "unset")};
  box-shadow: none;
  border: 1px solid rgb(211, 210, 210);
  padding: 1em;
  background-color: white;
  font-weight: bold;
  border-radius: 0.3em;
  font-size: 0.8em;
`;
