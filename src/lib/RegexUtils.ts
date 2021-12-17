const extractNumberFromRegexResult = (_value: string) => {
  const num = _value.split(':')[1];
  if (Number.isNaN(num)) throw new Error('Invalid value given');
  return Number(num.trim());
};

export default {
  extractNumberFromRegexResult,
};
