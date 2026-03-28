import { Combobox, InputBase, useCombobox, ScrollArea, Text } from '@mantine/core';
import { useState, useEffect } from 'react';

const SelectInput = (props) => {
  useEffect(() => {
    setData(props.options);
    setValue(props.form.getInputProps(props.name).value);
    setSearch(props.form.getInputProps(props.name).value);
  }, [props]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data?.filter((item) => item?.toLowerCase().includes(search?.toLowerCase().trim()));

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item} style={{ fontSize: 13 }}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === '$create') {
          setData((current) => [...current, search]);
          setValue(search);
          props.form.setFieldValue(props.name, search);
        } else {
          setValue(val);
          setSearch(val);
          props.form.setFieldValue(props.name, val);
        }
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          withAsterisk
          {...props.form.getInputProps(props.name)}
          label={props.label}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => { combobox.closeDropdown(); setSearch(value || ''); }}
          placeholder={props.placeholder}
          rightSectionPointerEvents="none"
          styles={{
            label: {
              fontSize: 11, fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: "#475569", marginBottom: 5
            },
            input: { fontSize: 13 }
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown style={{
        border: "1px solid rgba(59,130,246,0.2)",
        borderRadius: 10,
        boxShadow: "0 4px 16px rgba(59,130,246,0.1)",
        background: "linear-gradient(160deg, #ffffff 0%, #eff6ff 100%)",
        overflow: "hidden"
      }}>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {options}
            {!exactOptionMatch && search?.trim().length > 0 && (
              <Combobox.Option value="$create" style={{ fontSize: 13, color: "#3b82f6", fontWeight: 600 }}>
                + Create "{search}"
              </Combobox.Option>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SelectInput;