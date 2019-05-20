import React from 'react';
import Text from './Text';
import { MaterialIcons as MIcon } from '@expo/vector-icons';
import PlainButton from './PlainButton';
import appColors from 'constants/appColors';

interface Props {
  onBackPress: () => void;
  title: string;
}

const BackHeader = (props: Props) => {
  const { title, onBackPress } = props;
  return (
    <>
      <PlainButton style={{ marginBottom: 10 }} onPress={onBackPress}>
        <MIcon color={appColors.primary.light} name="arrow-back" size={30} />
      </PlainButton>
      <Text size="extraLarge" weight="bold">
        {title}
      </Text>
    </>
  );
};

export default BackHeader;
