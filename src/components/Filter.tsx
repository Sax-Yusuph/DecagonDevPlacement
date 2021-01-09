import {
	Box,
	Switch,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	Text,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { DarkModeSwitch } from './DarkModeSwitch'

export default function Filter({
	heading = 'All Users',
}: {
	heading?: string
}) {
	return (
		<Box color='black' mb={8}>
			<Heading mb={1}>{heading}</Heading>
			<Text as={'span'} color='gray.400'>
				Filter by
			</Text>

			<HStack spacing={4} mt={1}>
				<InputGroup>
					<InputLeftElement
						pointerEvents='none'
						children={<SearchIcon color='gray.50' />}
					/>
					<Input
						borderRadius={'2xl'}
						variant='filled'
						placeholder='Search'
						bg='gray.300'
						_focus={{
							outline: 'none',
							bg: 'gray.400',
						}}
					/>
				</InputGroup>
				<Select
					borderRadius={'2xl'}
					bg='gray.300'
					_focus={{
						outline: 'none',
					}}
					variant='filled'
					placeholder='country'
				/>

				<FormControl display='flex' alignItems='center'>
					<Switch id='email-alerts' />
					<FormLabel htmlFor='email-alerts' ml='2'>
						Show Country
					</FormLabel>
				</FormControl>
			</HStack>
		</Box>
	)
}
