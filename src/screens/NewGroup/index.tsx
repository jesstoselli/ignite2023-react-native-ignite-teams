import { useNavigation } from "@react-navigation/native";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { Container, Content, UsersIcon } from "./styles";
import { useState } from "react";

export function NewGroup() {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  function handleCreateNewGroup() {
    navigation.navigate("players", { group });
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <UsersIcon name='users' />
        <Highlight
          title='Nova turma'
          subtitle='crie a turma para adicionar as pessoas'
        />
        <Input placeholder='Nome da turma' onChangeText={setGroup} />
        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleCreateNewGroup}
        />
      </Content>
    </Container>
  );
}
