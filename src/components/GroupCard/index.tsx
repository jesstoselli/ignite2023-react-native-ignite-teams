import { Container, Title } from "./styles";
// import { Feather } from "@expo/vector-icons";

interface GroupCardProps {
  title: string;
}

export function GroupCard({ title, ...rest }: GroupCardProps) {
  return (
    <Container>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}

//  <Feather name='users' size={32} color='#00875F' style={{ marginRight: 20 }} />;
