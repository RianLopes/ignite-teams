import { Alert, FlatList } from 'react-native';
import { useCallback, useState } from 'react';
import { Container } from './styles';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';

export function Groups() {

  const [isLoading, setIsLoading] = useState(true);

  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {

      setIsLoading(true);

      const data = await groupsGetAll();

      setGroups(data);

    } catch (error) {
      console.log(error);
      Alert.alert('Turmas', 'Não foi possivel carregar as turmas');
    }finally {
      setIsLoading(false);
    }

  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));
  return (
    <Container>
      <Header />
      <HighLight
        title="Turmas"
        subTitle="jogue com a sua Turma"
      />
      {isLoading ? <Loading /> :
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty
              message="Que tal cadastrar a primeira turma?"
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      }
      <Button
        title="Criar Nova Turma"
        onPress={handleNewGroup}
      />
    </Container>
  );
}
