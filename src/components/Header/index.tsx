import { BackButton, BackIcon, Container, Logo } from "./styles";
import { useNavigation } from "@react-navigation/native";

import logo from "@assets/Logo.png";

type HeaderProps = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate("groups");
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon name='chevron-left' />
        </BackButton>
      )}
      <Logo source={logo} />
    </Container>
  );
}
