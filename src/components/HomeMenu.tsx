import {
  Heading,
  HStack,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  useRadioGroup,
  Icon,
  VStack,
  useRadio,
  Center,
  useColorMode,
} from '@chakra-ui/react'

import { getColorProp, getIconProp } from '../options/utils'
import { SearchIcon } from '@chakra-ui/icons'
import { MenuProps } from '../interfaces'
import { genderOptions } from '../options/options'
import { FormEvent, useState } from 'react'
import MotionBox from '../components/MotionBox'

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderWidth="1px"
        borderRadius="xl"
        boxShadow="md"
        border="none"
        bg={props.color}
        transition="all .2s ease-in-out"
        color="white"
        _checked={{
          color: 'white',
          // bg:
          transform: 'scale(1.1)',
          shadow: 'lg',
        }}
        _hover={{
          transform: 'scale(1.2)',
          boxShadow: '2xl',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        w="64px"
        h={'64px'}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export const HomeMenu = ({ filterState, setGender }: MenuProps) => {
  const [state, setState] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    filterState({ key: 'search', val: state })
    setState('')
  }
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'option',
    defaultValue: 'All users',
    onChange: (val) => {
      filterState({ key: 'gender', val })
      setGender(val)
    },
  })

  const group = getRootProps()

  const { colorMode } = useColorMode()
  const inputBg = {
    light: 'rgba(255, 255, 255, 0.366)',
    dark: 'rgba(0, 0, 0, 0.22)',
  }

  return (
    <Center
      flexDir="column"
      justifyContent="center"
      alignItems="flex-start"
      p={[10, null, 16]}
    >
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // @ts-ignore
        transition={{ delay: 1.5, duration: 2 }}
      >
        <Heading mb={3} color="white">
          <Text as="span" fontWeight="300">
            {' '}
            Hello,
          </Text>
          <Text as="span"> Emerald</Text>
        </Heading>
        <Text as="p" color="gray.300">
          {' '}
          Welcome to your dashboard, kindy sort through the user base
        </Text>
        <form onSubmit={handleSubmit}>
          <InputGroup mt="10">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.50" />}
            />
            <Input
              bg={inputBg[colorMode]}
              borderRadius={'xl'}
              variant="filled"
              placeholder="Search"
              onChange={(e) => setState(e.target.value)}
              value={state}
              size="lg"
              color={'blue.900'}
              _focus={{
                outline: 'none',
                bgColor: 'gray.300',
              }}
            />
          </InputGroup>
        </form>

        <Text
          as="p"
          fontWeight="bold"
          my={5}
          pt={10}
          color="gray.300"
          fontSize="0.8rem"
        >
          {' '}
          Show Users
        </Text>

        <HStack {...group} spacing={8}>
          {genderOptions.map((value: any) => {
            // @ts-ignore
            const radio = getRadioProps({ value })
            return (
              <MotionBox
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                // @ts-ignore
                transition={{ delay: 1 }}
                key={value}
              >
                <VStack spacing={2}>
                  <RadioCard {...radio} color={getColorProp(value)}>
                    <Icon as={getIconProp(value)} boxSize={8} />
                  </RadioCard>
                  <Text as="span" color="gray.300" fontSize={12}>
                    {value == 'male'
                      ? 'Male Users'
                      : value === 'female'
                      ? 'Female Users'
                      : value}
                  </Text>
                </VStack>
              </MotionBox>
            )
          })}
        </HStack>
      </MotionBox>
    </Center>
  )
}
