import styled from "styled-components";

export const Container = styled.div`
  display: block;
  width: 100%;
  height: inherit;
`;

export const DataSection = styled.section`
  display: flex;
  width: 100%;
  height: 80%;
  overflow: auto;
`;

export const ControlSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  button:first-child {
    margin-right: 2em;
  }
`;
