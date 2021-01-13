import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	IconButton,
	HStack,
	useColorMode,
	Flex,
	Spacer,
} from '@chakra-ui/react'
import { GiCloudDownload } from 'react-icons/gi'
import { FooterProps } from '../interfaces'
import { CSV_DOWNLOAD_OPTIONS } from '../options/options'
import { downloadCSV } from '../options/utils'
import MotionBox from './MotionBox'

export const Footer = ({ paginate, download, disableProps }: FooterProps) => {
	const { colorMode } = useColorMode()
	const bgColor = { light: 'teal.800', dark: 'purple.500' }
	const bgColor2 = { light: 'gray.800', dark: 'gray.100' }
	const buttonBg = { light: 'teal.800', dark: 'gray.500' }
	const buttonColor = { light: 'white', dark: 'black' }
	const buttonColor2 = { light: 'black', dark: 'black' }
	return (
		<Box as='div' alignSelf='flex-end' w='100%' bg={bgColor2[colorMode]}>
			<Flex pt={3} mt={3} px={3} width={'100%'}>
				<MotionBox whileTap={{ scale: 0.8 }}>
					<Button
						color='white'
						rounded='2xl'
						bgColor={bgColor[colorMode]}
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
				<Spacer />
				<HStack>
					<MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<IconButton
							aria-label='previous'
							icon={<ChevronLeftIcon color={buttonColor2[colorMode]} />}
							disabled={disableProps && download.length !== 0}
							bgColor='gray.300'
							_hover={{ bgColor: 'gray.600' }}
							_focus={{ outline: 'none', bgColor: 'gray.400' }}
							onClick={() => paginate('prev')}
						/>
					</MotionBox>
					<MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<IconButton
							aria-label='previous'
							disabled={disableProps && download.length !== 0}
							icon={<ChevronRightIcon color={buttonColor[colorMode]} />}
							bgColor={buttonBg[colorMode]}
							_hover={{ bgColor: 'gray.800' }}
							_focus={{ outline: 'none', bgColor: 'gray.600' }}
							onClick={() => paginate('next')}
						/>
					</MotionBox>
				</HStack>
			</Flex>
		</Box>
	)
}
