/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { connect } from 'react-redux';
import type { IAppState } from '../../redux/types/store.type';
import type { Course } from '../../redux/types/course.type';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseList from './CourseList';

type Props = {
	loadCourses: () => void;
	createCourse: (course: Course) => void;
	courses: Course[];
	loadAuthors: () => void;
};
type State = {
	course: Course | null;
};

class CoursesPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			course: null
		};
	}

	componentDidMount(): void {
		this.props.loadCourses();
		this.props.loadAuthors();
	}

	// handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const course = { ...this.state.course, title: e.target.value };
	// 	this.setState({ course });
	// };

	// handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	this.props.createCourse(this.state.course);

	// 	this.setState({ course: { title: '' } });
	// 	console.log(this.state.course);
	// };

	render() {
		return (
			<>
				<h2>Courses</h2>
				<CourseList courses={this.props.courses} />
			</>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		courses: state.authors.length
			? state.courses.map((course) => ({
					...course,
					author: state.authors.find((author) => author.id === course.authorId)
						.name
			  }))
			: [],
		authors: state.authors
	};
};

const mapDispatchToProps = {
	loadCourses: courseActions.loadCourses,
	createCourse: courseActions.createCourse,
	loadAuthors: authorActions.loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
