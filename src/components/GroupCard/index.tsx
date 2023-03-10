import { Container, Title } from "./styles";

interface GroupCardProps {
  title: string;
}

export function GroupCard({ title, ...rest }: GroupCardProps) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}
