const CONTRACT_ADDRESS = '0xf92c9d2C3FB93609aaD50C6b41E58130D1623FD4';
const transformCharacterData = (characterData) => {
    return {
      name: characterData.name,
      imageURI: characterData.imageURI,
      hp: characterData.hp.toNumber(),
      maxHp: characterData.maxHp.toNumber(),
      attackDamage: characterData.attackDamage.toNumber(),
    };
  };
export {CONTRACT_ADDRESS, transformCharacterData};
