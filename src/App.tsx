import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Modal from 'components/Modal';

import ModalService from 'services/Modal';

import Router from './navigation';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>

      <Modal ref={ModalService.setModalRef} />
    </>
  );
};

export default App;
