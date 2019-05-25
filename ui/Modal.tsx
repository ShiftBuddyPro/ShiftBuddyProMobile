import React from 'react';
import Modal from 'react-native-modalbox';

interface ModalBoxProps {
  visible: boolean;
  onClose?: () => void;
  children?: any;
  style?: any;
}

const ModalBox = (props: ModalBoxProps) => {
  return (
    <Modal
      style={{ height: null }}
      coverScreen
      isOpen={props.visible}
      position="bottom"
      onClosed={props.onClose}
      useNativeDriver={false}
      {...props}
    >
      {props.children ? props.children : null}
    </Modal>
  );
};

export default ModalBox;
