// server
const serverUrl = 'http://127.0.0.1:5000';
export const restUrl = `${serverUrl}/api/v1`;

// common
const loginPage = '/login';
const dashboard = '/dashboard';
const forgotPasswordPage = '/forgot-password';
const changePasswordPage = '/change-password';
const notFoundPage = '/not-found';
const profilePage = '/profile';

// college admin
export const collegeAdminPath = '/college-admin';
const addNewCollegeAdmin = '/add-new-college-admin';
const viewStpList = '/view-all';
const entityType = ':entityType';
const viewDetails = '/view-details'
const entityId = ':entityType/:entityId';
const onboardingPage = '/onboarding';
// const viewTeachers = ':teachers'
// const viewStudents = ':students'
// const viewParents = ':parents'
const collegeAdmins = '/view-all-college-admins'
const feedbackDrives = '/feedback-drives'

// super admin
const superAdminPath = '/regulator';
const collegeId = '/college/:collegeId'

// student
const studentPath = '/student';
const provideFeedbackST = '/provide-feedback/teacher';
const provideFeedbackSC = '/provide-feedback/college';
const provideFeedback1 = '/provide-feedback1';
const teacherLeaderboard = '/teacher-leaderboard';
const collegeLeaderboard = '/college-leaderboard';

// teacher
const teacherPath = '/teacher';
const grievancePortal = '/grievance-portal'
const viewFeedback = '/view-feedbacks'
// const dashboard1 = '/dashboard'

// parent
const parentPath = '/parent'


// // SUPER_ADMIN
// const superAdminPath='/regulator'


// college admin endpoints
export const collegeAdminEndpoints = addPrefixToPaths(
	{
		base: ['/', dashboard],
		dashboard: dashboard,
		addNewCollegeAdmin: addNewCollegeAdmin,
		viewStpList: viewStpList,
		viewDetails: viewDetails,
		collegeAdmins: collegeAdmins,
		feedbackDrives: feedbackDrives,
		onboardingPage: onboardingPage
		// viewTeachers: viewTeachers,
		// viewStudents: viewStudents,
		// viewParents: viewParents,
		// profile: '/profile',
	},
	collegeAdminPath,
);

// student endpoints
export const studentEndpoints = addPrefixToPaths(
	{
		base: ['/', teacherLeaderboard],
		// dashboard: dashboard,
		teacherLeaderboard: teacherLeaderboard,
		collegeLeaderboard: collegeLeaderboard,
		provideFeedbackST: provideFeedbackST,
		provideFeedbackSC: provideFeedbackSC,
		provideFeedback1: provideFeedback1,
	},
	studentPath,
);

export const superAdminEndpoints = addPrefixToPaths(
	{
		base: ['/', collegeLeaderboard],
		// dashboard: dashboard,
		collegeLeaderboard: collegeLeaderboard,
		teacherLeaderboard: teacherLeaderboard,
	},
	superAdminPath,
)

export const teacherEndpoints = addPrefixToPaths(
	{
		base: ['/', dashboard],
		dashboard: dashboard,
		teacherLeaderboard: teacherLeaderboard,
		collegeLeaderboard: collegeLeaderboard,
		grievancePortal: grievancePortal,
		viewFeedback: viewFeedback,

	},
	teacherPath
)

const provideFeedback = '/provide-feedback'

export const parentEndpoints = addPrefixToPaths(
	{
		base: ['/', collegeLeaderboard],
		collegeLeaderboard: collegeLeaderboard,
		teacherLeaderboard: teacherLeaderboard,
		provideFeedback: provideFeedback,
	},
	parentPath
)




export default Object.freeze({
	serverUrl,
	restUrl,
	collegeAdminPath,
	superAdminPath,
	loginPage,
	forgotPasswordPage,
	changePasswordPage,
	notFoundPage,
	profilePage,
	entityType,
	entityId,
	collegeId,
	collegeAdmin: collegeAdminEndpoints,
	student: studentEndpoints,
});

/**
 * @param {T} pathsObj
 * @param {string} prefix
 * @returns {T}
 *
 * @template {{[key: string]: string | string[]}} T
 */
function addPrefixToPaths(pathsObj, prefix) {
	const newEntries = Object.entries(pathsObj).map(([k, v]) => {
		if (typeof v === 'string') return [k, prefix + v];
		// handle array type
		return [k, v.map(path => prefix + path)];
	});

	return Object.freeze(Object.fromEntries(newEntries));
}
