import React from 'react';
import * as UI from 'ui';
import { Note } from 'types';
import SectionHeader from './SectionHeader';
import appColors from 'constants/appColors';

interface Props {
  notes: Note[];
}

const Notes = (props: Props) => {
  const { notes } = props;

  const renderLabels = () => (
    <UI.View style={styles.labelsRow}>
      <UI.Text weight="regular" style={styles.titleLabel}>
        Title
      </UI.Text>
      <UI.Text weight="regular" style={styles.messageLabel}>
        Message
      </UI.Text>
    </UI.View>
  );

  const renderDataRows = () =>
    notes.map(note => {
      const { title, message } = note.attributes;
      return (
        <UI.View key={note.id} style={styles.dataRow}>
          <UI.Text size="small" style={styles.titleData}>
            {title ? title : '-'}
          </UI.Text>
          <UI.Text size="small" style={styles.messageData}>
            {message}
          </UI.Text>
        </UI.View>
      );
    });

  return (
    <UI.View>
      <SectionHeader title="Notes" />
      <UI.View style={styles.tableContainer}>
        {renderLabels()}
        {renderDataRows()}
      </UI.View>
    </UI.View>
  );
};

const styles = UI.StyleSheet.create({
  tableContainer: {
    marginHorizontal: '5%',
  },

  labelsRow: {
    flexDirection: 'row',
    marginBottom: 7.5,
    borderBottomWidth: 1,
    borderBottomColor: appColors.grey.regular,
  },

  dataRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  titleLabel: {
    flex: 1,
  },

  messageLabel: {
    flex: 2,
  },

  titleData: {
    flex: 1,
  },

  messageData: {
    flex: 2,
  },
});

export default Notes;
