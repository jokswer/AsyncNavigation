# AsyncNavigation

## About The Project

Пример реализации асинхронной навигации

![ezgif-3-2834f6496c](https://user-images.githubusercontent.com/33955548/167119083-9fb5d943-5da5-4e23-8497-df2af6ecdd51.gif)

## Usage

### Пример использования withNavigateAsync

```typescript
interface Props extends AsyncNavigationProps<any> {}

const FirstScreen: React.FC<Props> = ({navigateAsync}) => {
  const [resultText, setResultText] = React.useState('Nope');

  const onSecondScreenNavigate = React.useCallback(async () => {
    const result = await navigateAsync<string>(ROUTE.SECOND_SCREEN);

    if (result) {
      setResultText(result);
    }
  }, [navigateAsync]);

  return (
    <View>
      <Text>{`Result: ${resultText}`}</Text>
      <Button title="Go to Second Screen" onPress={onSecondScreenNavigate} />
    </View>
  );
};

export default withNavigateAsync(FirstScreen);

```

### Пример использования useNavigateAsync

```typescript

interface Props {}

const FirstScreen: React.FC<Props> = () => {
  const [resultText, setResultText] = React.useState('Nope');

  const navigateAsync = useAsyncNavigation<string>();

  const onSecondScreenNavigate = React.useCallback(async () => {
    const result = await navigateAsync(ROUTE.SECOND_SCREEN);

    if (result) {
      setResultText(result);
    }
  }, [navigateAsync]);

  return (
    <View>
      <Text>{`Result: ${resultText}`}</Text>
      <Button title="Go to Second Screen" onPress={onSecondScreenNavigate} />
    </View>
  );
};

export default FirstScreen;

```

#### Пример получения данных с экрана

```typescript

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

```

### Пример использования useAsyncModal

```typescript

const FirstScreen: React.FC<Props> = () => {
  const [resultText, setResultText] = React.useState('Nope');

  const [openModal, closeModal] = useAsyncModal<string>();

  const onModalOpen = React.useCallback(async () => {
    const result = await openModal({
      content: () => <ModalContent onClose={closeModal} />,
    });

    if (result) {
      setResultText(result);
    }
  }, [openModal, closeModal]);

  return (
    <View>
      <Text>{`Result: ${resultText}`}</Text>
      <Button title="Open Modal Screen" onPress={onModalOpen} />
    </View>
  );
};

```

### Пример использования useAsyncModal с классовым компонентом

```typescript

class FirstScreen extends React.Component {
  render() {
    // Get it from props
    const { openModal, closeModal } = this.props;
  }
}

// Wrap and export
export default function(props) {
  const [openModal, closeModal] = useAsyncModal<string>();

  return <FirstScreen {...props} openModal={openModal} closeModal={closeModal} />;
}

```
