import React from 'react';
import { connect } from 'react-redux';
import type { IAppState } from '../../redux/types/store.type';
import type { Course } from '../../redux/types/course.type';
import * as courseActions from '../../redux/actions/courseActions';

type Props = {
	loadCourses: () => void;
	createCourse: (course: Course) => void;
	courses: Course[];
};
type State = {
	course: Course;
};

class CoursesPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			course: {
				title: ''
			}
		};
	}

	componentDidMount(): void {
		this.props.loadCourses();
	}

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const course = { ...this.state.course, title: e.target.value };
		this.setState({ course });
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		this.props.createCourse(this.state.course);

		this.setState({ course: { title: '' } });
		console.log(this.state.course);
	};

	render() {
		console.log(this.props.courses);
		return (
			<form onSubmit={this.handleSubmit}>
				<h2>Courses</h2>
				<h3>Add Course</h3>
				<input
					type="text"
					onChange={this.handleChange}
					value={this.state.course.title}
				/>
				<input type="submit" value="Save" />
				{this.props.courses.map((course: Course, i) => (
					<div key={i}>{course.title}</div>
				))}
			</form>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		courses: state.courses
	};
};

const mapDispatchToProps = {
	loadCourses: courseActions.loadCourses,
	createCourse: courseActions.createCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
