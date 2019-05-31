import React from 'react';
import * as UI from 'ui';
import { Check } from 'types';
import SectionHeader from './SectionHeader';

interface Props {
  checks: Check[];
}

const Checks = (props: Props) => {
  return (
    <UI.View>
      <SectionHeader title="Checks" />
    </UI.View>
  );
};

export default Checks;
