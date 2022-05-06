import React from 'react';

import {ModalOptions} from 'components/Modal';

import ModalService from 'services/Modal';

type ResolveCallback = (value?: any) => void;

/**
 * use
 * const [openModal, closeModal] = useAsyncNavigation();
 */

function useAsyncModal<T>() {
  const onNavigationResolveRef = React.useRef<ResolveCallback | null>(null);

  return [
    (options: ModalOptions): Promise<T> => {
      return new Promise((resolve: any) => {
        onNavigationResolveRef.current = resolve;

        ModalService.open({
          ...options,
          onClosed: () => {
            options.onClosed?.();
            resolve();
          },
        });
      });
    },
    (result?: any) => {
      ModalService.close();
      onNavigationResolveRef.current?.(result);
    },
  ];
}

export default useAsyncModal;
