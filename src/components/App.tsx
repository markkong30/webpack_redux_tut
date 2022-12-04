import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from '../common/Header';
import PageNotFound from './PageNotFound';
import CoursesPage from './courses/CoursesPage';
import ManageCourse from './courses/modal/ManageCourse';

const App: React.FC = () => {
	return (
		<div className="container-fluid">
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/courses" component={CoursesPage} />
				<Route exact path="/course" component={ManageCourse} />
				<Route path="/course/:slug" component={ManageCourse} />
				<Route component={PageNotFound} />
			</Switch>
		</div>
	);
};

export default App;
