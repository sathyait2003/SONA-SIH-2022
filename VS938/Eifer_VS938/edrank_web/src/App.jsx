import {
	LoginPage,
	// Dashboard,
	ProfilePage,
	AddNewCollegeAdmin,
	ChangePassword,
	STPListPage,
	FeedbackFormPage,
	// ProvideSTFeedback,
	ProvideSCFeedback,
	TeacherLeaderboard,
	CollegeLeaderboard,
	STPDetailsPage,
	SuperAdminDashboard,
	CollegeDetailsPage,
	FeedbackDrives,
	OnboardingPage,
	GrievancePortal,
	ParentHomePage,
	ProvidePCFeedback,
	ViewFeedback,
} from 'pages';
import endpoints, {
	collegeAdminEndpoints,
	parentEndpoints,
	studentEndpoints,
	superAdminEndpoints,
	teacherEndpoints,
} from 'constants/endpoints';
import {
	CollegeAdminRouter,
	StudentDashboard,
	CollegeAdminDashboard,
	TeacherDashboard,
} from 'components';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';

function App() {
	// console.log('COLLEGE ADMIN BASE');
	// console.log(collegeAdminEndpoints.dashboard);
	// console.log('ENTITY TYPE');
	// console.log(collegeAdminEndpoints.viewStpList);
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route exact path='/' element={<LoginPage />} />
					<Route exact path={endpoints.profilePage} element={<ProfilePage />} />
					<Route
						path={endpoints.changePasswordPage}
						element={<ChangePassword />}
					/>
					<Route path='/college-admin' element={<CollegeAdminRouter />}>
						<Route index element={<CollegeAdminDashboard />} />
						<Route
							path={collegeAdminEndpoints.dashboard}
							element={<CollegeAdminDashboard />}
						/>
						<Route
							path={collegeAdminEndpoints.addNewCollegeAdmin}
							element={<AddNewCollegeAdmin />}
						/>
						<Route path={collegeAdminEndpoints.viewStpList}>
							<Route path={endpoints.entityType} element={<STPListPage />} />
						</Route>
						<Route path={collegeAdminEndpoints.viewDetails}>
							<Route path={endpoints.entityId} element={<STPDetailsPage />} />
						</Route>
						<Route
							path={collegeAdminEndpoints.feedbackDrives}
							element={<FeedbackDrives />}
						/>
					</Route>
					<Route
						path={'/onboarding'}
						element={<OnboardingPage />}
					/>
					<Route path='/student' element={<CollegeAdminRouter />}>
						{/* <Route index element={<StudentDashboard />} /> */}
						<Route index element={<CollegeLeaderboard />} />
						<Route
							path={studentEndpoints.collegeLeaderboard}
							element={<CollegeLeaderboard />}
						/>
						<Route
							path={studentEndpoints.teacherLeaderboard}
							element={<TeacherLeaderboard />}
						/>
						<Route
							path={studentEndpoints.dashboard}
							element={<StudentDashboard />}
						/>
						<Route
							path={studentEndpoints.provideFeedbackSC}
							element={<ProvideSCFeedback />}
						/>
						<Route
							path={studentEndpoints.provideFeedbackST}
							element={<FeedbackFormPage />}
						/>
					</Route>
					<Route path='/regulator' element={<CollegeAdminRouter />}>
						<Route index element={<CollegeLeaderboard />} />
						{/* <Route
							path={superAdminEndpoints.dashboard}
							element={<SuperAdminDashboard />}
						/> */}
						<Route
							path={superAdminEndpoints.collegeLeaderboard}
							element={<CollegeLeaderboard />}
						/>
						<Route
							path={superAdminEndpoints.teacherLeaderboard}
							element={<TeacherLeaderboard />}
						/>
						<Route path=':collegeId' element={<CollegeDetailsPage />} />
					</Route>
					<Route path='/teacher' element={<CollegeAdminRouter />}>
						<Route index element={<StudentDashboard />} />
						<Route
							path={teacherEndpoints.dashboard}
							element={<TeacherDashboard />}
						/>
						<Route
							path={teacherEndpoints.teacherLeaderboard}
							element={<TeacherLeaderboard />}
						/>
						<Route
							path={teacherEndpoints.collegeLeaderboard}
							element={<CollegeLeaderboard />}
						/>
						<Route
							path={teacherEndpoints.viewFeedback}
							element={<ViewFeedback />}
						/>
						<Route
							path={teacherEndpoints.grievancePortal}
							element={<GrievancePortal />}
						/>
					</Route>
					<Route path='/parent' element={<CollegeAdminRouter />}>
						<Route index element={<CollegeLeaderboard />} />
						<Route
							path={parentEndpoints.collegeLeaderboard}
							element={<CollegeLeaderboard />}
						/>
						<Route
							path={parentEndpoints.teacherLeaderboard}
							element={<TeacherLeaderboard />}
						/>
						<Route
							path={parentEndpoints.provideFeedback}
							element={<ProvidePCFeedback />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
