import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// Components
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

// Styles
import { Container } from "./styles";
import { groupsRetrieve } from "@storage/group/groupRetrieve";

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new-group");
  }

  async function fetchStoredGroups() {
    try {
      setIsLoading(true);
      const data = await groupsRetrieve();
      setGroups(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  // executa sempre que retornar para a tela, mesmo que com backButton
  useFocusEffect(
    useCallback(() => {
      fetchStoredGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subtitle='jogue com a sua turma' />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <EmptyList message='Que tal cadastrar a primeira turma?' />
        )}
      />

      <Button title='Criar nova turma' onPress={handleNewGroup} />
    </Container>
  );
}
