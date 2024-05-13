import * as Grid from "@/components/Grid/style";
import * as S from "./style";
import { WarningIcon } from "@/assets/warningIcon";
interface NoContentProps {
  title: string;
  description: string;
}
export function NoContent({ title, description }: NoContentProps) {
  return (
    <S.NoContentContainer>
      <Grid.Container>
        <Grid.Item justifySelf="center">
          <WarningIcon />
        </Grid.Item>
        <Grid.Item justifySelf="center">
          <S.NoContentTitle>{title}</S.NoContentTitle>
        </Grid.Item>
        <Grid.Item justifySelf="center">
          <S.NoContentDescription>{description}</S.NoContentDescription>
        </Grid.Item>
      </Grid.Container>
    </S.NoContentContainer>
  );
}
