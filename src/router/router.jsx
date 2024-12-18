import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplications from "../pages/MyApplications/MyApplications";
import AddJob from "../pages/AddJob/AddJob";
import MyPostesJobs from "../pages/MyPostedJobs/MyPostesJobs";
import ViewApplications from "../pages/ViewApplications/ViewApplications";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,

            },
            {
                path: "/jobs/:id",
                element: <PrivateRoute><JobDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/jobs/${params.id}`)
            },
            {
                path: '/jobApply/:id',
                element: <PrivateRoute><JobApply /></PrivateRoute>,
            },
            {
                path: "/my_applications",
                element: <PrivateRoute><MyApplications /></PrivateRoute>
            },
            {
                path: '/add_job',
                element: <PrivateRoute><AddJob /></PrivateRoute>,

            },
            {
                path: '/my_posted_jobs',
                element: <PrivateRoute><MyPostesJobs /></PrivateRoute>,
            },
            {
                path: '/view_applications/:job_id',
                element: <PrivateRoute><ViewApplications /></PrivateRoute>,
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: 'signIn',
                element: <SignIn />
            },
        ],

    },
]);

export default router;