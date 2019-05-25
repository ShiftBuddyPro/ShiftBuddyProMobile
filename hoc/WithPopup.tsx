import * as React from 'react';
import { PopupConsumer } from '../context/PopupContext';
import { ShowPopupObject } from '../context/PopupContext';

type P = any;

const WithPopup = (WrappedComponent: React.ComponentType<P>) => {
  return (props: any) => (
    <PopupConsumer>
      {({ showPopup, closePopup }) => (
        <WrappedComponent
          {...props}
          showPopup={showPopup}
          closePopup={closePopup}
        />
      )}
    </PopupConsumer>
  );
};

export { ShowPopupObject };
export default WithPopup;
