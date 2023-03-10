import { BackButton, Container, Logo } from "./styles";
import { Feather } from "@expo/vector-icons";

import logo from "@assets/Logo.png";

type HeaderProps = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: HeaderProps) {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <Feather name='chevron-left' size={32} color='white' />
        </BackButton>
      )}
      <Logo source={logo} />
    </Container>
  );
}
