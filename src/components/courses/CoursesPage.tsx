import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import type { IAppState } from '../../redux/types/store.type';
import type { Course } from '../../redux/types/course.type';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseList from './CourseList';

type Props = {
	loadCourses: () => void;
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

	render() {
		return (
			<>
				<h2>Courses</h2>
				<Link to="/course">
					<button
						style={{ marginBottom: 20 }}
						className="btn btn-primary add-course mt-3"
					>
						Add Course
					</button>
				</Link>

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
	loadAuthors: authorActions.loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
