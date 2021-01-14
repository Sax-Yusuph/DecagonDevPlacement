import { ArrowForwardIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import {
  Avatar,
  HStack,
  Text,
  VStack,
  IconButton,
  Circle,
  useColorMode,
  useBreakpointValue,
  Spacer,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import MotionBox from './MotionBox'

export default function ResultCard(props: any) {
  const { user, setProfile, setShowProfile } = props
  const { colorMode } = useColorMode()
  const textColor = { light: 'white', dark: 'blue.900' }
  const textColor2 = { light: 'gray.50', dark: 'gray.600' }
  const textColor3 = { light: 'gray.100', dark: 'gray.400' }
  const bgColor = { light: 'gray.600', dark: 'white' }

  const flexVariant = useBreakpointValue({ base: 'wrap', md: 'wrap' })
  const handleClick = (user: any) => {
    setProfile([user])
    setShowProfile(true)
  }
  return (
    <MotionBox
      layout
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <HStack
        mb={3}
        bg={bgColor[colorMode]}
        shadow="xl"
        mx={2}
        p={5}
        spacing={[3, null, 5]}
        borderRadius="xl"
      >
        <Circle p={1} bg="teal.300">
          <Avatar src={user.picture.medium} size="lg" />
        </Circle>
        <VStack
          color={textColor[colorMode]}
          alignItems="flex-start"
          width="100%"
          spacing="1"
        >
          <Text as="h4" fontWeight="bold">
            {`${user.name.title} ${user.name.first} ${user.name.last}`}
          </Text>
          <Text
            as="p"
            color={textColor2[colorMode]}
            fontSize={['xs', null, 'sm']}
            fontStyle="italic"
          >
            {`${user.location.street.number}, ${user.location.street.name} ${user.location.state}`}
          </Text>
          <HStack
            width="100%"
            color={textColor3[colorMode]}
            flexWrap={flexVariant == 'wrap' ? 'wrap' : 'nowrap'}
          >
            <Wrap>
              <WrapItem>
                <HStack>
                  <EmailIcon />
                  <Text as="p" fontSize={['xs', null, 'sm']}>
                    {user.email}
                  </Text>
                </HStack>
              </WrapItem>
              <WrapItem>
                <HStack>
                  <PhoneIcon />
                  <Text fontSize={['xs', null, 'sm']}>{user.phone}</Text>
                </HStack>
              </WrapItem>
            </Wrap>
            <Spacer />
            <MotionBox
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              alignSelf="flex-end"
            >
              <IconButton
                shadow="xl"
                aria-label="view results"
                alignSelf="flex-end"
                colorScheme="teal"
                icon={<ArrowForwardIcon color="white" />}
                onClick={() => handleClick(user)}
              />
            </MotionBox>
          </HStack>
        </VStack>
      </HStack>
    </MotionBox>
  )
}
