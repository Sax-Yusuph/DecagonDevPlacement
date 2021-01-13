import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, IconButton, HStack } from '@chakra-ui/react'
import { GiCloudDownload } from 'react-icons/gi'
import { FooterProps } from '../interfaces'
import { CSV_DOWNLOAD_OPTIONS } from '../options/options'
import { downloadCSV } from '../options/utils'
import MotionBox from './MotionBox'

export const Footer = ({ paginate, download, disableProps }: FooterProps) => (
	<Box
		as='div'
		alignSelf='flex-end'
		w='100%'
		bg={'gray.100'}
		bottom={0}
		left={0}
	>
		<HStack pb={3} pt={3} spacing={20} justifyContent='space-between'>
			<MotionBox whileTap={{ scale: 0.8 }}>
				<Button
					color='white'
					rounded='2xl'
					bgColor='purple.500'
					leftIcon={<GiCloudDownload />}
					_hover={{ bgColor: 'purple.600' }}
					_focus={{ outline: 'none', bgColor: 'purple.400' }}
					_active={{ bgColor: 'purple.600' }}
					disabled={disableProps}
					onClick={() =>
						downloadCSV({ ...CSV_DOWNLOAD_OPTIONS, userData: download })
					}
				>
					Download Results
				</Button>
			</MotionBox>
			<HStack justifySelf='flex-end'>
				<MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
					<IconButton
						aria-label='previous'
						icon={<ChevronLeftIcon />}
						disabled={disableProps && download.length !== 0}
						bgColor='gray.400'
						_hover={{ bgColor: 'gray.600' }}
						_focus={{ outline: 'none', bgColor: 'gray.400' }}
						onClick={() => paginate('prev')}
					/>
				</MotionBox>
				<MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
					<IconButton
						aria-label='previous'
						disabled={disableProps && download.length !== 0}
						icon={<ChevronRightIcon />}
						bgColor='gray.600'
						_hover={{ bgColor: 'gray.800' }}
						_focus={{ outline: 'none', bgColor: 'gray.600' }}
						onClick={() => paginate('next')}
					/>
				</MotionBox>
			</HStack>
		</HStack>
	</Box>
)
