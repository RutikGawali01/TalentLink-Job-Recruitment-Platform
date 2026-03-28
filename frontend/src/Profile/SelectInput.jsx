import { Combobox, InputBase, useCombobox, ScrollArea } from "@mantine/core";
import { useState } from "react";

const SelectInput = ({ form, name, label, placeholder, options = [], leftSection: Icon }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState(form.values[name] || "");

  const exactOptionMatch = options.some((item) => item === search);

  const filteredOptions = exactOptionMatch
    ? options
    : options.filter((item) =>
        item?.toLowerCase().includes(search?.toLowerCase().trim())
      );

  const renderedOptions = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        const newValue = val === "$create" ? search : val;

        form.setFieldValue(name, newValue);
        setSearch(newValue);

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          {...form.getInputProps(name)}
          label={label}
          withAsterisk
          placeholder={placeholder}
          value={search}
          leftSection={Icon ? <Icon stroke={1.5} size={16} /> : null}
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onChange={(event) => {
            setSearch(event.currentTarget.value);
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          styles={{
            input: {
              borderRadius: "12px",
              borderColor: "#bfdbfe",
              background: "#fff",
              fontSize: "14px",
            },
            label: {
              fontWeight: 600,
              color: "#1e3a5f",
              fontSize: "13px",
              marginBottom: "4px",
            },
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200}>
            {renderedOptions}

            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">
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