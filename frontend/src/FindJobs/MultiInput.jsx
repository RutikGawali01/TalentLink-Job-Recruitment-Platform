import { useEffect, useState } from 'react';
import {
  useMantineTheme,
  Checkbox,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
  ScrollArea
} from '@mantine/core';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../Slice/FilterSlice';
import {IconSelector} from "@tabler/icons-react"

const MultiInput = (props) => {
  const dispatch = useDispatch();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const MAX_DISPLAYED_VALUES = 2;

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    setData(props.options || []);
  }, [props.options]);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val) => {
    setSearch('');

    if (val === '$create') {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
      dispatch(updateFilter({ [props.title]: [...value, search] }));
    } else {
      dispatch(updateFilter({ [props.title]: value.includes(val)?value.filter((v) => v !== val):[...value, val]  }));
      setValue((current)=> current.includes(val)?current.filter((v) => v !== val):[...current, val])
      
    }
  };

  const handleValueRemove = (val) => {

    dispatch(updateFilter({ [props.title]: value.filter((v) => v !== val) }));
    setValue((current) => current.filter((v) => v !== val));
  };

  const theme = useMantineTheme();

  const values = value
    .slice(
      0, 1
    )
    .map((item) => (
      <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
        {item}
      </Pill>
    ));

  const options = data
    .filter((item) =>
      item.toLowerCase().includes(search.trim().toLowerCase())
    )
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm" >
          <Checkbox size='xs' color={theme.colors.brightSun[4]}
            checked={value.includes(item)}
            onChange={() => {}}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
          />
          <span className='text-mine-shaft-300'>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput
        variant='unstyled'
          // label={props.title}
          onClick={() => combobox.openDropdown()}
          leftSection={
            <div className="flex text-bright-sun-400  p-0.8 m-2 ">
              {props.icon && <props.icon />}
            </div>
          }
          rightSection={<IconSelector />}
        >
          <Pill.Group>
            {value.length > 0 && (
              <>
                {values}
                {value.length > MAX_DISPLAYED_VALUES && (
                  <Pill>
                    +{value.length - (MAX_DISPLAYED_VALUES - 1)} more
                  </Pill>
                )}
              </>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                className='!text-mine-shaft-200 flex gap-2 mr-2'
                value={search}
                placeholder={props.title}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown className=''>
        <Combobox.Options className='' >
          <ScrollArea.Autosize mah = {200}  type="scroll" >
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">
              + Create {search}

            </Combobox.Option>
          )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default MultiInput;