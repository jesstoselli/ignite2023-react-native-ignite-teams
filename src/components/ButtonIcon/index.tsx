import { TouchableOpacityProps } from "react-native";
import { ButtonIconTypeStyleProps, Container, Icon } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

type IconButtonProps = TouchableOpacityProps & {
  iconName: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStyleProps;
};

export function ButtonIcon({ iconName, type = "PRIMARY" }: IconButtonProps) {
  return (
    <Container>
      <Icon name={iconName} type={type} />
    </Container>
  );
}
