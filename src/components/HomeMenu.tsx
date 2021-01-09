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
} from '@chakra-ui/react'
import { FaUsers, FaMale, FaFemale } from 'react-icons/fa'
import { SearchIcon } from '@chakra-ui/icons'
// import RadioCard from './RadioButtons'

function RadioCard(props: any) {
	const { getInputProps, getCheckboxProps } = useRadio(props)

	const input = getInputProps()
	const checkbox = getCheckboxProps()

	return (
		<Box as='label'>
			<input {...input} />
			<Box
				{...checkbox}
				cursor='pointer'
				display='flex'
				justifyContent='center'
				alignItems='center'
				borderWidth='1px'
				borderRadius='lg'
				boxShadow='md'
				bg={props.color}
				transition='all .5s ease-in-out'
				_checked={{
					color: 'white',
					// bg:
					transform: 'scale(1.1)',
					boxShadow: 'lg',
				}}
				_hover={{
					transform: 'scale(1.2)',
					boxShadow: '2xl',
				}}
				_focus={{
					boxShadow: 'outline',
				}}
				w='64px'
				h={'64px'}
			>
				{props.children}
			</Box>
		</Box>
	)
}

export const HomeMenu = ({ title }: { title?: string }) => {
	const options = ['All users', 'Male users', 'Female users']

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'option',
		defaultValue: 'All users',
		onChange: console.log,
	})
	const group = getRootProps()
	const getColorProp = (value: string) =>
		value === 'All users'
			? 'pink.500'
			: value === 'Male users'
			? 'teal.500'
			: 'purple.500'
	const getIconProp = (value: string) =>
		value === 'All users' ? FaUsers : value === 'Males' ? FaMale : FaFemale

	return (
		<Box m={10} pt={10} minH='100%'>
			<Heading mb={3}>
				<Text as='span' fontWeight='300'>
					{' '}
					Hello,
				</Text>
				<Text as='span'> Emerald</Text>
			</Heading>
			<Text as='p' color='gray.300'>
				{' '}
				Welcome to your dashboard, kindy sort through the user base
			</Text>
			<InputGroup mt='10'>
				<InputLeftElement
					pointerEvents='none'
					children={<SearchIcon color='gray.50' />}
				/>
				<Input
					borderRadius={'xl'}
					variant='filled'
					placeholder='Search'
					size='lg'
					_focus={{
						outline: 'none',
						bgColor: '#fff',
					}}
				/>
			</InputGroup>

			<Text
				as='p'
				fontWeight='bold'
				my={5}
				pt={10}
				color='gray.300'
				fontSize='0.8rem'
			>
				{' '}
				Show Users
			</Text>

			<HStack {...group} spacing={8}>
				{options.map(value => {
					const radio = getRadioProps({ value })
					return (
						<VStack spacing={2} key={value}>
							<RadioCard {...radio} color={getColorProp(value)}>
								<Icon as={getIconProp(value)} />
							</RadioCard>
							<Text as='span' fontSize='10px'>
								{value}
							</Text>
						</VStack>
					)
				})}
			</HStack>
		</Box>
	)
}
