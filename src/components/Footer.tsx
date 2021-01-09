import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
	Flex,
	FlexProps,
	Box,
	Button,
	IconButton,
	HStack,
} from '@chakra-ui/react'
import { GiCloudDownload, GiRayGun } from 'react-icons/gi'

export const Footer = (props: FlexProps) => (
	<Box
		as='div'
		alignSelf='flex-end'
		w='100%'
		bg={'gray.100'}
		bottom={0}
		left={0}
	>
		<HStack pb={3} pt={3} spacing={20} justifyContent='space-between'>
			<Button
				color='white'
				rounded='2xl'
				bgColor='purple.500'
				leftIcon={<GiCloudDownload />}
				_hover={{ bgColor: 'purple.600' }}
				_focus={{ outline: 'none', bgColor: 'purple.400' }}
				_active={{ bgColor: 'purple.600' }}
			>
				Download Results
			</Button>
			<HStack justifySelf='flex-end'>
				<IconButton
					aria-label='previous'
					icon={<ChevronLeftIcon />}
					bgColor='gray.400'
					_hover={{ bgColor: 'gray.600' }}
					_focus={{ outline: 'none', bgColor: 'gray.400' }}
				/>
				<IconButton
					aria-label='previous'
					icon={<ChevronRightIcon />}
					bgColor='gray.600'
					_hover={{ bgColor: 'gray.800' }}
					_focus={{ outline: 'none', bgColor: 'gray.600' }}
				/>
			</HStack>
		</HStack>
	</Box>
)
