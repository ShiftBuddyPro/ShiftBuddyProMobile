import React from 'react';
import * as UI from 'ui';

interface State {}

interface Props {}

class ManagerSettings extends React.Component<Props, State> {
  render() {
    return (
      <UI.View>
        <UI.Text>Settings page</UI.Text>
      </UI.View>
    );
  }
}

export default ManagerSettings;
