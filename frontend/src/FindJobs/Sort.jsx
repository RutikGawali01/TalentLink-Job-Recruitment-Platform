import { useState } from 'react';
import { Button, Combobox, useCombobox, Text, Box } from '@mantine/core';
import {IconAdjustments} from "@tabler/icons-react"
import {useDispatch} from "react-redux"
import {updateSort} from "../Slice/SortSlice"

const opt = ['Relevance', 'Most Recent', 'Salary: Low to High', 'Salary: Hight to Low'];
const talentSort = ['Relevance', 'Experience: Low to High', 'Experience: High to Low']

const Sort = (props)=> {
  const dispatch = useDispatch();
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

  const options = props.sort=="job"?opt.map((item) => (
      <Combobox.Option className='text-xs' value={item} key={item}>
        {item}
      </Combobox.Option>
    )):talentSort.map((item)=>(
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
          dispatch(updateSort(val));
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target withAriaAttributes={false}>
          {/* <Button onClick={() => combobox.toggleDropdown()}>
            Pick item
          </Button> */}
          <div onClick={() => combobox.toggleDropdown()} 
            className='cursor-pointer border border-accent 
                flex items-center px-2 max-[475px]:px-1 max-[350px]:mt-2 py-1 gap-2 text-sm max-[475px]:text-xs
                 rounded-xl '>
            {selectedItem} <IconAdjustments  className='h-5 w-5  text-[var(--blue-600)]' />
          </div>
        </Combobox.Target>

        <Combobox.Dropdown className='rounded-3xl border-4' >
          {/* <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search groceries"
          /> */}
          <Combobox.Options className=''>
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
