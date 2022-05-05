import React from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

type ResolveCallback = (value?: any) => void;

/**
 * use
 * const navigateAsync = useAsyncNavigation();
 */

function useAsyncNavigate() {
  const onNavigationResolveRef = React.useRef<ResolveCallback | null>(null);

  const navigation = useNavigation<any>();

  useFocusEffect(
    React.useCallback(() => {
      onNavigationResolveRef?.current?.();
    }, []),
  );

  return (route: string, params?: any): Promise<any> => {
    return new Promise(resolve => {
      onNavigationResolveRef.current = resolve;

      navigation.navigate(route, {
        ...params,
        onDismiss: (result: any) => {
          onNavigationResolveRef.current = null;
          resolve(result);
        },
      });
    });
  };
}

export default useAsyncNavigate;
