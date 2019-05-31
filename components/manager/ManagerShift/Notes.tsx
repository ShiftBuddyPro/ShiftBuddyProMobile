import React from 'react';
import * as UI from 'ui';
import { Note } from 'types';
import SectionHeader from './SectionHeader';

interface Props {
  notes: Note[];
}

const Notes = (props: Props) => {
  return (
    <UI.View>
      <SectionHeader title="Notes" />
    </UI.View>
  );
};

export default Notes;
