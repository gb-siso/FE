'use client';
import React from 'react';
import styled from 'styled-components';

// 타입 정의
type Party =
  | ''
  | '더불어민주당'
  | '국민의힘'
  | '조국혁신당'
  | '개혁신당'
  | '진보당'
  | '새로운미래';

interface PartyOption {
  value: Party;
  label: string;
}

interface FilterProps {
  selected: string;
  onChange: (party: Party) => void;
}

const parties: PartyOption[] = [
  { label: '전체', value: '' },
  { label: '더불어민주당', value: '더불어민주당' },
  { label: '국민의힘', value: '국민의힘' },
  { label: '조국혁신당', value: '조국혁신당' },
  { label: '개혁신당', value: '개혁신당' },
  { label: '진보당', value: '진보당' },
  { label: '새로운미래', value: '새로운미래' }
];

const FilterComponent: React.FC<FilterProps> = ({ selected, onChange }) => {
  const handlePartySelect = (party: Party) => {
    const nextParty = party === selected ? '' : party;
    onChange(nextParty);
  };

  return (
    <FilterContainer>
      <FilterLabel>정당:</FilterLabel>
      {parties.map((party) => (
        <PartyPill
          key={party.value}
          $active={selected === party.value}
          onClick={() => handlePartySelect(party.value)}
        >
          {party.label}
        </PartyPill>
      ))}
    </FilterContainer>
  );
};

export default FilterComponent;

// 스타일드 컴포넌트
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
  z-index: 100;
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;

const FilterLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  white-space: nowrap;
`;

const PartyPill = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  background-color: ${(props) => (props.$active ? '#8800fb' : '#f8f9fa')};
  color: ${(props) => (props.$active ? 'white' : '#495057')};
  border: none;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => (props.$active ? '#8800fb' : '#e9ecef')};
  }
`;
