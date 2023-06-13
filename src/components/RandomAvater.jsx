import React from 'react';
import Avatar from 'avataaars';

const RandomAvatar = () => {
  const getRandomOption = (options) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  const getRandomAvatar = () => {
    const avatarOptions = {
      topType: ['ShortHairShaggyMullet', 'HatWinter', 'LongHairCurly'],
      accessoriesType: ['Blank', 'Round', 'Sunglasses'],
      hairColor: ['BrownDark', 'Platinum'],
      facialHairType: ['BeardLight', 'Blank'],
      facialHairColor: ['Auburn', 'Brown'],
      clotheType: ['BlazerSweater', 'ShirtCrewNeck'],
      clotheColor: ['PastelYellow', 'Blue01'],
      eyeType: ['Default', 'Wink'],
      eyebrowType: ['Default', 'RaisedExcited'],
      mouthType: ['Default', 'Smile'],
      skinColor: ['Pale', 'Tanned']
    };

    return Object.keys(avatarOptions).reduce((avatar, option) => {
      const randomOption = getRandomOption(avatarOptions[option]);
      return { ...avatar, [option]: randomOption };
    }, {});
  };

  const randomAvatar = getRandomAvatar();

  return <Avatar {...randomAvatar} />;
};

export default RandomAvatar;
