import { Container, Logo } from "./styles";
import { Ionicons } from "@expo/vector-icons";

import logo from "@assets/Logo.png";

export function Header() {
  return (
    <Container>
      <Ionicons name='chevron-back' size={32} color='#FFF' />
      <Logo source={logo} />
    </Container>
  );
}
