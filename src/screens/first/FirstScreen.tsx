import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';

import {ROUTE} from 'navigation/routes';
import withNavigateAsync, {
  AsyncNavigationProps,
} from 'navigation/withAsyncNavigate';
// import useAsyncNavigation from 'navigation/useAsyncNavigate';

interface Props extends AsyncNavigationProps<any> {}

const FirstScreen: React.FC<Props> = ({navigateAsync}) => {
  const [resultText, setResultText] = React.useState('Nope');

  const onSecondScreenNavigate = React.useCallback(async () => {
    const result = await navigateAsync(ROUTE.SECOND_SCREEN);

    if (result) {
      setResultText(result);
    }
  }, [navigateAsync]);

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>{`Result: ${resultText}`}</Text>
      <Button title="Go to Second Screen" onPress={onSecondScreenNavigate} />
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
