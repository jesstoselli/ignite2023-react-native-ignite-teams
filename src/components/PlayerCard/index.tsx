import { Container, Icon, Name } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";

type PlayerCardProps = {
  name: string;
  onRemove: () => void;
};

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
  return (
    <Container>
      <Icon name='person' />

      <Name>{name}</Name>
      <ButtonIcon iconName='close' type='SECONDARY' onPress={onRemove} />
    </Container>
  );
}
