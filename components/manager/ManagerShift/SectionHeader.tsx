import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';

interface Props {
  title: string;
}

const SectionHeader = (props: Props) => {
  const { title } = props;
  return (
    <UI.Text size="large" weight="semibold" style={styles.header}>
      {title}
    </UI.Text>
  );
};

const styles = UI.StyleSheet.create({
  header: {
    marginBottom: 10,
    color: appColors.grey.dark,
  },
});

export default SectionHeader;
