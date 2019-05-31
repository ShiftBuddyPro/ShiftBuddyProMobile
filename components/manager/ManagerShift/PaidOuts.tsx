import React from 'react';
import * as UI from 'ui';
import { PaidOut } from 'types';
import SectionHeader from './SectionHeader';

interface Props {
  paidOuts: PaidOut[];
}

const PaidOuts = (props: Props) => {
  return (
    <UI.View>
      <SectionHeader title="Paid Outs" />
    </UI.View>
  );
};

export default PaidOuts;
