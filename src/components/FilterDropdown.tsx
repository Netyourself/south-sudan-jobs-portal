import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Button,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  FormLabel,
} from '@chakra-ui/react';

interface FilterDropdownProps {
  id?: string;
  options: string[];
  placeholder: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  isRequired?: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  id,
  options,
  placeholder,
  selectedValue,
  onValueChange,
  isRequired,
}) => {
  const [inputValue, setInputValue] = useState('');

  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const maxDisplayedOptions = 10;
  useEffect(() => {
    // Delay the filtering logic for 300ms after the user stops typing
    const timeoutId = setTimeout(() => {
      const filtered = options.filter(
        (item) =>
          !inputValue || item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, options]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  return (
    <Box>
      <Menu id={id}>
        <MenuButton
          as={Button}
          size='md'
          bg='white'
          flex='1'
          color='gray.600'
          borderColor='blue.300'
          variant='outline'
          _hover={{
            borderColor: 'yellow.300',
            backgroundColor: 'yellow.500',
            color: 'white',
          }}
          _focus={{ borderColor: 'blue.500' }}
          rightIcon={<span>▼</span>}
        >
          {selectedValue || placeholder}
        </MenuButton>
        <MenuList>
          <Input
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            size='sm'
            flex='1'
            variant='filled'
            bg='white'
            color='gray.700'
            borderColor='blue.300'
            _placeholder={{ color: 'gray.400' }}
            _hover={{ borderColor: 'yellow.300' }}
            _focus={{ borderColor: 'blue.500' }}
            value={inputValue}
            onChange={handleInputChange}
          />
          {filteredOptions.slice(0, maxDisplayedOptions).map((item) => (
            <MenuItem
              key={item}
              onClick={() => {
                console.log('menu item', item);
                onValueChange(item);
                setInputValue('');
              }}
            >
              {item}
            </MenuItem>
          ))}
          {/*
          {filteredOptions.length > maxDisplayedOptions && (
            <MenuItem>More options available...</MenuItem>
          )}
          */}
        </MenuList>
        {isRequired && !selectedValue && (
          <MenuItem color='red.500'>This field is required.</MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default FilterDropdown;
