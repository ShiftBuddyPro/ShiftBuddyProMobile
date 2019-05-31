import React from 'react';
import * as UI from 'ui';
import { ChangeSheet } from 'types';
import SectionHeader from './SectionHeader';

interface Props {
  changeSheet: ChangeSheet;
}

const Change = (props: Props) => {
  return (
    <UI.View>
      <SectionHeader title="Change" />
    </UI.View>
  );
};

export default Change;
