import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';

import ModalContent from 'components/ModalContent/ModalContent';

import useAsyncModal from 'hooks/useAsyncModal';
// import useAsyncNavigation from 'hooks/useAsyncNavigate';

import {ROUTE} from 'navigation/routes';
import withNavigateAsync, {
  AsyncNavigationProps,
} from 'navigation/withAsyncNavigate';

interface Props extends AsyncNavigationProps<any> {}

const FirstScreen: React.FC<Props> = ({navigateAsync}) => {
  const [resultText, setResultText] = React.useState('Nope');

  const [openModal, closeModal] = useAsyncModal<string>();

  const onSecondScreenNavigate = React.useCallback(async () => {
    const result = await navigateAsync<string>(ROUTE.SECOND_SCREEN);

    if (result) {
      setResultText(result);
    }
  }, [navigateAsync]);

  const onModalOpen = React.useCallback(async () => {
    const result = await openModal({
      content: () => <ModalContent onClose={closeModal} />,
    });

    if (result) {
      setResultText(result);
    }
  }, [openModal, closeModal]);

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>{`Result: ${resultText}`}</Text>
      <Button title="Go to Second Screen" onPress={onSecondScreenNavigate} />
      <Button title="Open Modal Screen" onPress={onModalOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default withNavigateAsync(FirstScreen);
