import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";
import { Feather } from "@expo/vector-icons";

type GroupCardProps = TouchableOpacityProps & {
  title: string;
};

export function GroupCard({ title, ...rest }: GroupCardProps) {
  return (
    <Container {...rest}>
      <Feather
        name='users'
        size={32}
        color='#00875F'
        style={{ marginRight: 20 }}
      />
      <Title>{title}</Title>
    </Container>
  );
}
