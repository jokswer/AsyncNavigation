import {ModalOptions} from 'components/Modal';

class ModalService {
  modalRef: any = null;

  get isOpen() {
    return this.modalRef?.isOpen;
  }

  setModalRef = (modal: any) => {
    this.modalRef = modal;
  };

  open = (options: ModalOptions) => {
    this.modalRef?.open(options);
  };

  close = () => {
    this.modalRef?.close();
  };
}

export default new ModalService();
