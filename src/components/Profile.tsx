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
import MotionBox from './MotionBox'
export default function Profile({ profile, setShowProfile }: any) {
	return (
		<MotionBox
			initial={{ opacity: 0, y: '50vh' }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -50 }}
		>
			<VStack alignItems='flex-start'>
				<Button
					leftIcon={<ArrowBackIcon />}
					color='gray.500'
					variant='ghost'
					onClick={() => setShowProfile(false)}
				>
					Results
				</Button>

				<Box>
					<HStack alignItems='flex-start' spacing={5}>
						<Circle p={1} bg='teal.300'>
							<Avatar src={profile.picture.large} alt='profile' size='2xl' />
						</Circle>
						<VStack alignItems='flex-start' spacing={4}>
							<Text as='h4' fontWeight='bold'>
								{`${profile.name.title} ${profile.name.first} ${profile.name.last}`}
							</Text>
							<Text as='p' color='gray.600' fontSize='0.9rem'>
								{`${profile.location.street.number}, ${profile.location.street.name} ${profile.location.state}`}
							</Text>

							<HStack bg='gray.300' rounded='2xl' py={2} px={3}>
								<EmailIcon />
								<Text as='p' fontSize='0.9rem'>
									{profile.email}
								</Text>
							</HStack>
							<HStack bg='pink.200' rounded='2xl' py={2} px={3}>
								<Text as='p' fontSize='0.9rem'>
									JOINED: {profile.registered.date}
								</Text>
							</HStack>
							<HStack rounded='2xl' color='gray.500'>
								<Icon as={FiPhoneCall} />
								<Text fontSize='0.9rem'>{profile.phone}</Text>
							</HStack>
							<HStack rounded='2xl' color='gray.500'>
								<Icon as={FiSmartphone} />
								<Text fontSize='0.9rem'>{profile.cell}</Text>
							</HStack>
						</VStack>
					</HStack>
				</Box>
			</VStack>
		</MotionBox>
	)
}
