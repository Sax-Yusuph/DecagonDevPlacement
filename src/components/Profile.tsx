import { ArrowBackIcon, EmailIcon } from '@chakra-ui/icons'
import {
	Box,
	HStack,
	Text,
	Avatar,
	VStack,
	Circle,
	Icon,
	Button,
} from '@chakra-ui/react'
import { FiPhoneCall, FiSmartphone } from 'react-icons/fi'
export default function Profile() {
	return (
		<VStack alignItems='flex-start'>
			<Button leftIcon={<ArrowBackIcon />} color='gray.500' variant='ghost'>
				Results
			</Button>

			<Box>
				<HStack alignItems='flex-start' spacing={5}>
					<Circle p={1} bg='teal.300'>
						<Avatar src='' alt='profile' size='2xl' />
					</Circle>
					<VStack alignItems='flex-start' spacing={4}>
						<Text as='h4' fontWeight='bold'>
							{' '}
							Mrs. Shalom Chioma
						</Text>
						<Text as='p' color='gray.600' fontSize='0.9rem'>
							{' '}
							45, church street alapere, ketu
						</Text>

						<HStack bg='gray.300' rounded='2xl' py={2} px={3}>
							<EmailIcon />
							<Text as='p' fontSize='0.9rem'>
								Yusuphshamsondeen@gmail.com
							</Text>
						</HStack>
						<HStack bg='pink.200' rounded='2xl' py={2} px={3}>
							<Text as='p' fontSize='0.9rem'>
								JOINED: 2020-01-02
							</Text>
						</HStack>
						<HStack rounded='2xl' color='gray.500'>
							<Icon as={FiPhoneCall} />
							<Text fontSize='0.9rem'>07011359405</Text>
						</HStack>
						<HStack rounded='2xl' color='gray.500'>
							<Icon as={FiSmartphone} />
							<Text fontSize='0.9rem'>07011359405</Text>
						</HStack>
					</VStack>
				</HStack>
			</Box>
		</VStack>
	)
}
