import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

export interface AsyncNavigationProps<P extends ParamListBase>
  extends NativeStackScreenProps<P> {
  navigateAsync: <T>(route: string, params?: any) => Promise<T>;
}

const withNavigateAsync = (
  AsyncNavigationClient: React.ComponentType<any>,
): any => {
  return class AsyncNavigationWrapper extends React.Component<
    NativeStackScreenProps<any>
  > {
    focusListener?: () => void;
    onNavigationResolve: null | ((value?: any) => void) = null;

    get navigation() {
      return this.props.navigation;
    }

    componentDidMount() {
      this.focusListener = this.navigation.addListener('focus', () => {
        this.onNavigationResolve?.();
      });
    }

    componentWillUnmount() {
      if (this.focusListener) {
        this.focusListener?.();
      }
    }

    navigateAsync = (route: string, params?: any): Promise<any> => {
      return new Promise(resolve => {
        this.onNavigationResolve = resolve;

        this.navigation.navigate(route, {
          ...params,
          onDismiss: (result: any) => {
            this.onNavigationResolve = null;
            resolve(result);
          },
        });
      });
    };

    public render() {
      return (
        <AsyncNavigationClient
          navigateAsync={this.navigateAsync}
          {...this.props}
        />
      );
    }
  };
};

export default withNavigateAsync;
