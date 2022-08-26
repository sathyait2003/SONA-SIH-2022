import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

function KbcGraph({ data }) {
	ChartJS.register(ArcElement, Tooltip, Legend);
	return (
		<Bar
			datasetIdKey='id'
			data={{
				labels: Object.keys(data),
				datasets: [
					{
						id: 1,
						label: '',
						data: Object.values(data),
						backgroundColor: [
							'rgba(255, 0, 21, 0.719)',
							// 'rgba(40, 169, 255, 0.747)',
							'rgba(238, 255, 0, 0.747)',
							'rgba(60, 255, 0, 0.7)',
						],
					},
				],
			}}
		/>
	);
}

export default KbcGraph;
