import styled from "styled-components";

export const Container = styled.div<{ templatecolumns?: string }>`
  display: grid;
  width: 100%;
  grid-gap: 1em;
  grid-template-columns: ${(props) => props.templatecolumns ?? "1fr"};
`;
export const Item = styled.div<{
  justifySelf?: string;
  alignSelf?: string;
}>`
  width: 100%;
  display: flex;
  justify-content: ${(props) => props.justifySelf ?? "flex-start"};
  align-items: ${(props) => props.alignSelf ?? "flex-start"};
`;
