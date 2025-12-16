import { useEffect, useState } from 'react';
import {
  useMantineTheme,
  Checkbox,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from '@mantine/core';
//import { useDispatch } from 'react-redux';
//import { updateFilter } from '../../Slices/FilterSlice';

const MultiInput = (props) => {
  //const dispatch = useDispatch();

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
      const updatedValues = value.includes(val)
        ? value.filter((v) => v !== val)
        : [...value, val];

      setValue(updatedValues);
      dispatch(updateFilter({ [props.title]: updatedValues }));
    }
  };

  const handleValueRemove = (val) => {
    const updatedValues = value.filter((v) => v !== val);
    setValue(updatedValues);
    dispatch(updateFilter({ [props.title]: updatedValues }));
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
        <Group gap="sm">
          <Checkbox size='xs' color={theme.colors.brightSun[4]}
            checked={value.includes(item)}
            onChange={() => {}}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
          />
          <span>{item}</span>
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
          label={props.title}
          onClick={() => combobox.openDropdown()}
          leftSection={
            <div className="text-bright-sun-400 bg-mine-shaft-800 p-1 rounded-full gap-2">
              {props.icon && <props.icon />}
            </div>
          }
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
                className='flex gap-2'
                value={search}
                placeholder="Search values"
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

      <Combobox.Dropdown>
        <Combobox.Options  >
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">
              + Create {search}
            </Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default MultiInput;