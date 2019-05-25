import React from 'react';
import * as UI from 'ui';
import { StyleSheet } from 'react-native';

interface Props {
  children: any;
}

interface State {
  popupVisible: boolean;
  content: JSX.Element;
  closePopup: any;
  showPopup: any;
  fullscreen: boolean;
}

export interface ShowPopupObject {
  content: State['content'];
  delay?: boolean;
  fullscreen?: State['fullscreen'];
}

const PopupContext = React.createContext({
  popupVisible: false,
  content: <UI.View />,
  closePopup: () => {},
  showPopup: (_: ShowPopupObject) => {},
});

class PopupProvider extends React.Component<Props, State> {
  state = {
    popupVisible: false,
    content: <UI.View />,
    closePopup: () => {
      this.setState({ popupVisible: false });
    },
    showPopup: ({ content, delay, fullscreen = false }: ShowPopupObject) => {
      setTimeout(
        () => {
          this.setState({ popupVisible: true, content: content, fullscreen });
        },
        delay ? 600 : 0
      );
    },
    fullscreen: false,
  };

  renderPopup() {
    const { popupVisible, closePopup, content, fullscreen } = this.state;

    const popupContainerStyle = {
      ...styles.popupContainer,
      ...(fullscreen && { flex: 1, paddingHorizontal: 0 }),
    };

    return (
      <UI.Modal
        visible={popupVisible}
        onClose={closePopup}
        style={popupContainerStyle}
      >
        {content}
      </UI.Modal>
    );
  }

  render() {
    return (
      <PopupContext.Provider value={this.state}>
        {this.renderPopup()}
        {this.props.children}
      </PopupContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  popupContainer: {
    height: 'auto',
    paddingBottom: 45,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});

const PopupConsumer = PopupContext.Consumer;

export { PopupProvider, PopupConsumer };
