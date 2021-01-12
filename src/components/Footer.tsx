import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, IconButton, HStack } from '@chakra-ui/react'
import { GiCloudDownload } from 'react-icons/gi'
import { FooterProps } from '../interfaces'
import { CSV_DOWNLOAD_OPTIONS } from '../options/options'
import { downloadCSV } from '../options/utils'

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
			<HStack justifySelf='flex-end'>
				<IconButton
					aria-label='previous'
					icon={<ChevronLeftIcon />}
					disabled={disableProps}
					bgColor='gray.400'
					_hover={{ bgColor: 'gray.600' }}
					_focus={{ outline: 'none', bgColor: 'gray.400' }}
					onClick={() => paginate('prev')}
				/>
				<IconButton
					aria-label='previous'
					disabled={disableProps}
					icon={<ChevronRightIcon />}
					bgColor='gray.600'
					_hover={{ bgColor: 'gray.800' }}
					_focus={{ outline: 'none', bgColor: 'gray.600' }}
					onClick={() => paginate('next')}
				/>
			</HStack>
		</HStack>
	</Box>
)
