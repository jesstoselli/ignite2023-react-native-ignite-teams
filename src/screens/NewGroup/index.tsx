import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { AppError } from "@utils/AppError";
import { groupCreate } from "@storage/group/groupCreate";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { Container, Content, UsersIcon } from "./styles";
import { Alert } from "react-native";

export function NewGroup() {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  async function handleCreateNewGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome do grupo.");
      }

      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo.");
        console.log(error);
      }
    }
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
