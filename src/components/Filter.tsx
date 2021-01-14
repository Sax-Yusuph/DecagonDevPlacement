import {
  Box,
  FormControl,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { DarkModeSwitch } from './DarkModeSwitch'
import { COUNTRIES } from '../options/options'
import { MenuProps } from '../interfaces'
import { getHeading } from '../options/utils'

export default function Filter({ gender, filterState }: MenuProps) {
  const heading = getHeading(gender)
  const { colorMode } = useColorMode()
  const bgColor = {
    light: 'rgba(255, 255, 255, 0.281)',
    dark: 'gray.300',
  }
  const bgColor2 = {
    light: 'blue.900',
    dark: 'gray.600',
  }
  const color = { light: 'white', dark: 'blue.900' }
  const color2 = { light: 'black', dark: 'white' }

  return (
    <Box mb={8} pl={4} pt={2} width={'100%'} color={color[colorMode]}>
      <Heading mb={1}>{heading}</Heading>
      <Text as={'span'} color="gray.400">
        Filter by
      </Text>

      <HStack spacing={4} mt={2}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.50" />}
          />
          <Input
            borderRadius={'2xl'}
            variant="filled"
            placeholder="Search"
            bg={bgColor[colorMode]}
            _focus={{
              outline: 'none',
            }}
            _hover={{
              bg: 'gray.400',
            }}
            onChange={(e) =>
              filterState({ key: 'search', val: e.target.value })
            }
          />
        </InputGroup>
        <Select
          borderRadius={'2xl'}
          bg={bgColor[colorMode]}
          _focus={{
            outline: 'none',
          }}
          _hover={{
            bg: 'gray.400',
          }}
          variant="filled"
          placeholder="country"
          // color={color[colorMode]}
          onChange={(e) => filterState({ key: 'nat', val: e.target.value })}
        >
          {COUNTRIES.map((country) => (
            <option
              key={country}
              value={country}
              style={{
                backgroundColor: bgColor2[colorMode],
                color: color2[colorMode],
              }}
            >
              {country}
            </option>
          ))}
        </Select>

        <FormControl display="flex" flex={1} alignItems="center">
          <DarkModeSwitch />
        </FormControl>
      </HStack>
    </Box>
  )
}
