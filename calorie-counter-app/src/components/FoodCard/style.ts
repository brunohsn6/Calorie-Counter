import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 4em;
  padding: 2em;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  span {
    display: flex;
    justify-content: center;
  }
  &:hover {
    opacity: 0.7;
  }
  &:is(:focus, :active) {
    opacity: 0.3;
  }
`;

export const Title = styled.span`
  width: 100%;
  font-weight: bold;
  font-size: 1.2em;
`;

export const Description = styled.span`
  width: 100%;
  font-weight: normal;
  font-size: 1em;
  color: rgb(163, 159, 159);
`;
