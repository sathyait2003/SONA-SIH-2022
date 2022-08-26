import { useState, useEffect } from 'react';
import { makeRequest } from 'services';
import { LeaderboardCard, LeaderboardCardTopThree } from 'components';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { useRef } from 'react';

function CollegeLeaderBoards() {
	const {
		// register,
		handleSubmit,
		control,
		// formState: { errors },
	} = useForm();
	const [leaderboard, setLeaderboard] = useState([]);
	const [requestType, setRequestType] = useState('NATIONAL');
	const [state, setState] = useState('Delhi');
	const [city, setCity] = useState('New Delhi');
	let localStates = localStorage.getItem('stateOptions');
	console.log('localStates: ' + localStates);
	const [states, setStates] = useState([
		{ label: 'Delhi', value: 'Delhi' },
		{
			label: 'Tamil Nadu',
			value: 'Tamil Nadu',
		},
		{ label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
	]);
	let localCities = localStorage.getItem('cityOptions');
	const [cities, setCities] = useState([
		{ label: 'New Delhi', value: 'New Delhi' },
		{ label: 'Salem', value: 'Salem' },
		{ label: 'Indore', value: 'Indore' },
	]);

	let allColleges = useRef([]);

	const getFilterOptions = (colleges, filterType) => {
		console.log('COLLEGES');
		console.log(colleges);
		let filterOptions = [];
		if (filterType === 'STATE') {
			colleges?.map(college => {
				if (
					!filterOptions.includes({
						value: college.state,
						label: college.state,
					})
				) {
					filterOptions.push({
						value: `${college.state}`,
						label: `${college.state}`,
					});
				}
			});
			console.log('filterOptions STATE');
			console.log(filterOptions);
			localStorage.setItem('stateOptions', JSON.parse(filterOptions));
			setStates([...filterOptions]);
		}
		if (filterType === 'REGIONAL') {
			colleges?.map(college => {
				if (
					!filterOptions.includes({ value: college.city, label: college.city })
				) {
					filterOptions.push({
						value: `${college.city}`,
						label: `${college.city}`,
					});
				}
			});
			console.log('filterOptions CITY');
			console.log(filterOptions);
			localStorage.setItem('cityOptions', JSON.parse(filterOptions));
			setCities(filterOptions);
		}
	};

	useEffect(() => {
		console.log('useEffect');
		setLeaderboard([]);
		async function fetchData() {
			const response = await makeRequest('top-n-colleges', 'POST', {
				request_type: requestType,
				state: state,
				city: city,
				n: -1,
			});
			setLeaderboard(response?.data.data.colleges);
			console.log('REQUEST TYPEEEE');
			console.log(requestType);
			if (requestType === 'NATIONAL') {
				allColleges.current = response?.data.data.colleges;
				setCities(getFilterOptions(allColleges.current, 'REGIONAL'));
				setStates(getFilterOptions(allColleges.current, 'STATE'));
			}
		}
		fetchData();
	}, [requestType, state, city]);

	// separate top three
	const separateTopThree = arr => {
		const topThree = arr?.slice(0, 3);
		const rest = arr?.slice(3);
		return [topThree, rest];
	};
	const [topThree, rest] = separateTopThree(leaderboard);

	const onSubmit = data => {
		console.log(data);
		if (requestType === 'STATE') {
			setState(data.state_filter.value);
		}
		if (requestType === 'REGIONAL') {
			setCity(data.city_filter.value);
		}
	};

	const tenantType = localStorage.getItem('tenant_type');

	return (
		<>
			<div className='teacher-leaderboard-main'>
				<h1 className='teacher-leaderboard-header'>Leaderboard</h1>
				<form className='request-type-form'>
					{console.log('states NATIONALs')}
					{console.log(states)}
					<input
						type='radio'
						name='requestType'
						id='requestTypeNational'
						value='NATIONAL'
						defaultChecked
						onChange={e => setRequestType(e.target.value)}
					/>
					<label htmlFor='requestTypeNational'>National</label>
					<input
						type='radio'
						name='requestType'
						id='requestTypeState'
						value='STATE'
						onChange={e => setRequestType(e.target.value)}
					/>
					<label htmlFor='requestTypeState'>State</label>
					<input
						type='radio'
						name='requestType'
						id='requestTypeCity'
						value='REGIONAL'
						onChange={e => setRequestType(e.target.value)}
					/>
					<label htmlFor='requestTypeCity'>City</label>
				</form>
				{requestType !== 'NATIONAL' && (
					<form
						className='leaderboard-filter-container'
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='leaderboard-filter-item'>
							<span>Filter by: </span>
						</div>
						{requestType === 'STATE' && (
							<div className='leaderboard-filter-item  state_filter'>
								{console.log('states')}
								{console.log(states)}
								<label htmlFor='state_filter'>
									<Controller
										name='state_filter'
										control={control}
										rules={{ required: 'This field is required' }}
										render={({ field }) => (
											<Select
												name='state_filter'
												inputId='state_filter'
												defaultValue={[{ value: 'Delhi', label: 'Delhi' }]}
												options={states}
												{...field}
											/>
										)}
									/>
								</label>
							</div>
						)}
						{requestType === 'REGIONAL' && (
							<div className='leaderboard-filter-item city_filter'>
								<label htmlFor='city_filter'>
									<Controller
										name='city_filter'
										control={control}
										rules={{ required: 'This field is required' }}
										render={({ field }) => (
											<Select
												name='city_filter'
												inputId='city_filter'
												defaultValue={[
													{ value: 'New Delhi', label: 'New Delhi' },
												]}
												options={cities}
												{...field}
											/>
										)}
									/>
								</label>
							</div>
						)}
						<input type='submit' value='Apply' />
					</form>
				)}
				<div className='teacher-leaderboard-top-3'>
					{console.log('states MAPPED')}
					{console.log(states)}
					{topThree?.map((lb, i) => {
						return (
							<LeaderboardCardTopThree
								key={i}
								name={lb.name}
								rank={lb.rank}
								college_name={lb.college_name}
								submain={`${lb.city}, ${lb.state}`}
								isCollegeLeaderboard={true}
								path={
									tenantType === 'SUPER_ADMIN'
										? `/regulator/${lb.id}`
										: ''
								}
							/>
						);
					})}
				</div>
				{rest?.map((lb, i) => {
					return (
						<LeaderboardCard
							key={i}
							rank={lb.rank}
							main={lb.name}
							submain={`${lb.city}, ${lb.state}`}
							isCollegeLeaderboard={true}
							path={
								tenantType === 'SUPER_ADMIN'
									? `/regulator/${lb.id}`
									: ''
							}
						/>
					);
				})}
			</div>
		</>
	);
}

export default CollegeLeaderBoards;
