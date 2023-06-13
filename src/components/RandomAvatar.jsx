import React, { useState, useEffect } from 'react';
import Avatar from 'avataaars';
import Button from 'react-bootstrap/Button';

const avatars = [
  {
    topType: 'ShortHairShaggyMullet',
    accessoriesType: 'Blank',
    hairColor: 'BrownDark',
    facialHairType: 'BeardLight',
    facialHairColor: 'Auburn',
    clotheType: 'BlazerSweater',
    clotheColor: 'PastelYellow',
    eyeType: 'Default',
    eyebrowType: 'Default',
    mouthType: 'Default',
    skinColor: 'Pale'
  },
  {
    topType: 'HatWinter',
    accessoriesType: 'Blank',
    hairColor: 'Platinum',
    facialHairType: 'Blank',
    facialHairColor: 'Brown',
    clotheType: 'ShirtCrewNeck',
    clotheColor: 'Blue01',
    eyeType: 'Wink',
    eyebrowType: 'RaisedExcited',
    mouthType: 'Smile',
    skinColor: 'Tanned'
  },
  // Add more avatar options as needed
];

const RandomAvatar = ({ user, onAvatarSelection }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    if (user && !user.avatar) {
      setSelectedAvatar(avatars[0]);
    } else if (user && user.avatar) {
      setSelectedAvatar(user.avatar);
    }
  }, [user]);

  const handleAvatarSelection = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleSaveAvatar = () => {
    if (selectedAvatar) {
      onAvatarSelection(selectedAvatar);
    }
  };

  if (!user) {
    return null; // Render a loading state or redirect to a login page
  }

  return (
    <div>
      {user && !user.avatar && (
        <div>
          <h4>Choose Your Avatar</h4>
          <div>
            {avatars.map((avatar, index) => (
              <Avatar
                key={index}
                {...avatar}
                style={{ cursor: 'pointer' }}
                onClick={() => handleAvatarSelection(avatar)}
              />
            ))}
          </div>
          <Button variant="primary" onClick={handleSaveAvatar}>
            Save Avatar
          </Button>
        </div>
      )}

      {selectedAvatar && (
        <div>
          <h4>Selected Avatar</h4>
          <Avatar {...selectedAvatar} />
        </div>
      )}
    </div>
  );
};

export default RandomAvatar;
