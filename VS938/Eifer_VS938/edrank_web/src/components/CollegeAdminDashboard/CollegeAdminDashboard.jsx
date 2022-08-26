import { makeRequest } from 'services/api';
import { useEffect, useState } from 'react';
import './CollegeAdminDashboard.scss';
import { DashboardMetricsCard, KbcGraph, SaGraph } from 'components';
import Select from 'react-select';

function CollegeAdminDashboard() {
	const [data, setData] = useState([]);
	const [teacherId, setTeacherId] = useState(1);
	const [questionId, setQuestionId] = useState(1);
	const [saData, setSaData] = useState({});
	const [kbcData, setKbcData] = useState({});
	const [progressData, setProgressData] = useState({});
	const collegeId = localStorage.getItem('user_info');
	// console.log('COLLEGE ID: ' + JSON.parse(collegeId).cid);

	const [teachers, setTeachers] = useState([]);
	const [questions, setQuestions] = useState([]);

	const handleTeacherChange = e => {
		// console.log('TEACHER ID: ' + e.value);
		setTeacherId(e.value);
	};

	const handleQuestionChange = e => {
		// console.log('QUESTION ID: ' + e.value);
		setQuestionId(e.value);
	};

	const getTeacherOptions = () => {
		let teacherOptions = [];
		teachers.forEach(teacher => {
			teacherOptions.push({
				value: teacher.id,
				label: teacher.name,
			});
		});
		// console.log(teacherOptions);
		return teacherOptions;
	};
	const getQuestionOptions = () => {
		let questionOptions = [];
		questions.forEach(question => {
			questionOptions.push({
				value: question.id,
				label: question.title,
			});
		});
		// console.log(questionOptions);
		return questionOptions;
	};

	useEffect(() => {
		async function fetchData() {
			const response = await makeRequest('dashboard-metrics', 'GET');
			setData(response?.data.data);
			// console.log(response?.data.data);

			const response1 = await makeRequest('top-n-teachers', 'POST', {
				request_type: 'COLLEGE',
				cid: parseInt(JSON.parse(collegeId).cid),
				n: -1,
			});
			// console.log('RESPONSE1');
			// console.log(response1?.data.data.teachers);
			setTeachers(response1?.data.data.teachers);

			const response2 = await makeRequest('feedback-questions/ST', 'POST', {
				cid: parseInt(JSON.parse(collegeId).cid),
			});
			// console.log('RESPONSE2');
			// console.log(response2?.data.data.questions);
			setQuestions(response2?.data.data.questions);
		}
		fetchData();
	}, []);

	function getKbcObject(data) {
		let kbcObject = {};
		data.forEach(item => {
			kbcObject[item.OptionName] = item.ResponseCount;
		});
		// console.log('KBCOBJECT');
		// console.log(kbcObject);
		return kbcObject;
	}

	function getprogressOject(data) {
		let progressObject = {};
		data.forEach(item => {
			progressObject[item.drive_id] = item.rank;
		});
		console.log('PROGRESSOBJECT');
		console.log(progressObject);
		return progressObject;
	}

	useEffect(() => {
		async function fetchData1() {
			const response = await makeRequest('sa-graph/teacher', 'POST', {
				teacher_id: teacherId,
			});
			setSaData(response?.data.data.sa_graph);
			// console.log(response?.data.data.sa_graph);

			const response1 = await makeRequest('kbc-graph', 'POST', {
				teacher_id: teacherId,
				question_id: questionId,
			});
			const kbcObject = getKbcObject(response1?.data.data.graph_data);
			setKbcData(kbcObject);
			// console.log(response1?.data.data.graph_data);

			const response2 = await makeRequest('progress-graph/' + teacherId, 'GET');
			const progressObject = getprogressOject(response2?.data.data.progress);
			setProgressData(progressObject);
			console.log(response2?.data.data.progress);
		}
		fetchData1();
	}, [teacherId, questionId]);

	return (
		<div className='college-admin-dashboard-main'>
			<div className='college-admin-dashboard-metrics-wrapper'>
				<DashboardMetricsCard digit={data.college_feedbacks} text='Feedbacks' />
				<DashboardMetricsCard digit={data.drives} text='Drives run' />
				<DashboardMetricsCard digit={data.students} text='Students' />
				<DashboardMetricsCard digit={data.teachers} text='Teachers' />
			</div>
			<div className='college-admin-dashboard-graphs'>
				<h3 className='graph-heading'>Sentimental Analysis</h3>
				<b>Select Teacher</b>
				<Select
					options={getTeacherOptions()}
					defaultValue={{ value: 1, label: 'Kavita Pabreja' }}
					onChange={e => handleTeacherChange(e)}
				/>
				<div className='sa-graph-wrapper'>
					<SaGraph saData={saData} chartType='Doughnut' />
				</div>
				<div className='sa-graph-wrapper  progress-graph-wrapper'>
					<SaGraph saData={progressData} chartType='Line' />
					<p>Drives(drive id)</p>
					<p>Your rank</p>
				</div>
				<h3 className='graph-heading'>Question wise response</h3>
				<b>Select Question</b>
				<Select
					options={getQuestionOptions()}
					// defaultValue={{ value: 1, label: 'Kavita Pabreja' }}
					onChange={e => handleQuestionChange(e)}
				/>
				<div className='kbc-graph-wrapper'>
					<SaGraph saData={kbcData} chartType='Bar' />
					{/* <KbcGraph data={kbcData} /> */}
				</div>
			</div>
		</div>
	);
}

export default CollegeAdminDashboard;
