import { Feather } from "@expo/vector-icons";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { Container, Content } from "./styles";

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Feather
          name='users'
          size={56}
          color='#00875F'
          style={{ alignSelf: "center" }}
        />
        <Highlight
          title='Nova turma'
          subtitle='crie a turma para adicionar as pessoas'
        />
        <Input placeholder='Nome da turma' />
        <Button title='Criar' style={{ marginTop: 20 }} />
      </Content>
    </Container>
  );
}
