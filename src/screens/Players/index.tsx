import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Keyboard, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Utils
import { AppError } from "@utils/AppError";

// Storage
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

// Components
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

// Styles
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemove } from "@storage/group/groupRemove";

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      // Keyboard.dismiss();
      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "N??o foi poss??vel adicionar.");
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "N??o foi poss??vel carregar a lista de pessoas para o time selecionado."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      Alert.alert(
        "Remover integrante",
        "Tem certeza que deseja remover essa pessoa do time?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: async () => {
              await playerRemoveByGroup(playerName, group);
              fetchPlayersByTeam();
              Alert.alert("Pessoa removida com sucesso.");
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Remover pessoa",
        "N??o foi poss??vel remover a pessoa selecionada."
      );
    }
  }

  async function groupRemoval() {
    try {
      await groupRemove(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Remover Grupo",
        "N??o foi poss??vel remover o grupo selecionado."
      );
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover Time", "Tem certeza que deseja excluir esse time?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => groupRemoval(),
      },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle='adicione a galera e separe os times' />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon iconName='add' onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => {
              handleRemovePlayer(item.name);
            }}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyList message='N??o h?? pessoas nesse time.' />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        title='Remover turma'
        type='SECONDARY'
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
