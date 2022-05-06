import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

interface Props {
  onClose: (result?: any) => void;
}

const ModalContent: React.FC<Props> = ({onClose}) => {
  const [result, setResult] = React.useState<string>();

  const onSetResultPress = React.useCallback(() => {
    onClose(result);
  }, [result, onClose]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.resultInput}
        placeholder="Enter a result"
        placeholderTextColor="#00000080"
        onChangeText={setResult}
      />
      <Button title="Set Modal Result" onPress={onSetResultPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
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

export default ModalContent;
