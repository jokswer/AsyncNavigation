import React from 'react';
import {StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';

export type ModalOptions = {
  content?: () => React.ReactNode;
  onClose?: () => void;
  onClosed?: () => void;
};

type State = Readonly<{options: ModalOptions; isOpened: boolean}>;

class Modal extends React.Component<{}> {
  state: State = {
    options: {},
    isOpened: false,
  };

  modalizeRef = React.createRef<Modalize>();

  get isOpen() {
    return this.state.isOpened;
  }

  get options() {
    return this.state.options;
  }

  get modalize() {
    return this.modalizeRef?.current;
  }

  get content() {
    const {content} = this.state.options || {};
    return content;
  }

  open = (options: ModalOptions) => {
    this.setState({options});
    this.modalizeRef?.current?.open();
  };

  close = () => {
    const {options} = this.state;

    if (options?.onClose) {
      options.onClose();
    }
    this.modalize?.close();
  };

  onOpened = () => {
    this.setState({isOpened: true});
  };

  onClosed = () => {
    const {onClosed} = this.options;
    this.setState({isOpened: false});
    onClosed?.();
  };

  render() {
    return (
      <Modalize
        ref={this.modalizeRef}
        modalStyle={styles.modal}
        onOpened={this.onOpened}
        onClosed={this.onClosed}
        adjustToContentHeight={true}>
        {this.content ? this.content() : null}
      </Modalize>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
});

export default Modal;
