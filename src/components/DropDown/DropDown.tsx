import { Menu } from '@headlessui/react';

import Arrowdown from '@/assets/svg/Arrowdown';
import { filterItemType } from '@/constants/Community/Type/index';
const DROPDOWN_MOCK_DATA = [
  {
    text: '최신순',
    key: 'latest'
  },
  {
    text: '인기순',
    key: 'popular'
  },
  {
    text: '댓글 많은 순',
    key: 'comments'
  }
];

const grey_7 = '[#E5E5E5]';

type DropDownType = {
  data: typeof DROPDOWN_MOCK_DATA;
  current?: (typeof DROPDOWN_MOCK_DATA)[0];
  onClick: (item: (typeof DROPDOWN_MOCK_DATA)[0]) => void;
  selectFilter?: (filter: filterItemType) => void;
};

const DropDown = ({ data, current, onClick, selectFilter }: DropDownType) => {
  const clickHandler = (item: filterItemType) => {
    onClick(item);
    if (selectFilter) {
      selectFilter(item);
    }
  };

  const currentText = current?.text || data[0]?.text;
  if (!data || data.length === 0) return <></>;
  return (
    <Menu
      as="div"
      className={`relative max-sm:mr-2 border-[#E5E5E5] border rounded-[4px] bg-#fff z-50`}
    >
      <Menu.Button
        className={`px-3 py-[7px] flex items-center gap-[5px] text-${grey_7} text-[14px] max-md:text-[10px] focus:outline-none`}
      >
        {currentText}
        <Arrowdown />
      </Menu.Button>
      <Menu.Items
        as="ul"
        className={`focus:outline-none absolute bg-white w-[264px] left-0 top-60px border border-${grey_7} py-[9px] flex flex-col max-sm:right-[-27vh] max-sm:top-[32px] w-[120px] z-50`}
      >
        {data.map((item) => (
          <Menu.Item
            onClick={() => clickHandler(item)}
            key={item.key}
            as="li"
            className={`px-[18px] cursor-pointer hover:bg-grey.8 py-[9px] focus:outline-none} hover:text-[#4C41D3]`}
          >
            <button
              className={
                'text-[15px] max-md:text-[10px] tracking-[-0.15px] font-medium focus:outline-none '
              }
            >
              {item.text}
            </button>{' '}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default DropDown;
