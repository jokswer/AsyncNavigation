import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AsyncNavigationRouteProps} from 'navigation/withAsyncNavigate';

interface Props
  extends NativeStackScreenProps<AsyncNavigationRouteProps, 'params'> {}

const SecondScreen: React.FC<Props> = ({route, navigation}) => {
  const [result, setResult] = React.useState<string>();

  const onSetResultPress = React.useCallback(() => {
    route.params.onDismiss(result);
    navigation.pop();
  }, [navigation, route, result]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.resultInput}
        placeholder="Enter a result"
        placeholderTextColor="#00000080"
        onChangeText={setResult}
      />
      <Button title="Set Screen Result" onPress={onSetResultPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    width: '60%',
  },
});

export default SecondScreen;
