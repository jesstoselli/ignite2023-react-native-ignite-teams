import { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Components
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

// Styles
import { Container } from "./styles";

export function Groups() {
  const [groups, setGroups] = useState([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new-group");
  }

  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subtitle='jogue com a sua turma' />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <EmptyList message='Que tal cadastrar a primeira turma?' />
        )}
      />

      <Button title='Criar nova turma' onPress={handleNewGroup} />
    </Container>
  );
}
