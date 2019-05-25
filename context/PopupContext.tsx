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
}

export interface ShowPopupObject {
  content: State['content'];
  delay?: boolean;
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
    showPopup: ({ content, delay }: ShowPopupObject) => {
      setTimeout(
        () => {
          this.setState({ popupVisible: true, content: content });
        },
        delay ? 600 : 0
      );
    },
  };

  renderPopup() {
    const { popupVisible, closePopup, content } = this.state;

    return (
      <UI.Modal
        visible={popupVisible}
        onClose={closePopup}
        style={styles.popupContainer}
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
  },
});

const PopupConsumer = PopupContext.Consumer;

export { PopupProvider, PopupConsumer };
