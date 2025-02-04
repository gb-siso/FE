export const findParty = (party: string) => {
  const map: { [key: string]: string } = {
    PartyA: '국민의힘',
    PartyB: '더불어민주당',
    PartyC: '정의당'
  };
  return map[party];
};
