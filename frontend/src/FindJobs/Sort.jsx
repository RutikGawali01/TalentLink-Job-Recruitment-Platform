import { useState } from 'react';
import { Button, Combobox, useCombobox, Text, Box } from '@mantine/core';
import {IconAdjustments} from "@tabler/icons-react"

const opt = ['Relevance', 'Most Recent', 'Salary (Low to High)', 'Salary (High to Low)'];

const Sort = ()=> {
  //const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState('Relevance');

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      //setSearch('');
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const options = opt
    // .filter((item) =>
    //   item.toLowerCase().includes(search.toLowerCase().trim())
    // )
    .map((item) => (
      <Combobox.Option className='text-xs' value={item} key={item}>
        {item}
      </Combobox.Option>
    ));

  return (
    <>
      {/* <Box mb="xs">
        <Text span size="sm" c="dimmed">
          Selected item:{' '}
        </Text>

        <Text span size="sm">
          {selectedItem || 'Nothing selected'}
        </Text>
      </Box> */}

      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target withAriaAttributes={false}>
          {/* <Button onClick={() => combobox.toggleDropdown()}>
            Pick item
          </Button> */}
          <div onClick={() => combobox.toggleDropdown()} className='cursor-pointer border border-bright-sun-400 flex items-center px-2 py-1 gap-2 text-sm rounded-xl '>
            {selectedItem} <IconAdjustments  className='h-5 w-5  text-bright-sun-400 ' />
          </div>
        </Combobox.Target>

        <Combobox.Dropdown >
          {/* <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search groceries"
          /> */}
          <Combobox.Options>
            {options.length > 0 ? options : (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}

export default Sort;
