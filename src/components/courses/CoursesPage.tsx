import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import type { IAppState } from '../../redux/types/store.type';
import type { Course } from '../../redux/types/course.type';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseList from './CourseList';
import Spinner from '../../common/Spinner';
import { Author } from '../../redux/types/author.type';

type Props = {
	loadCourses: () => Promise<void>;
	courses: Course[];
	authors: Author[];
	loadAuthors: () => Promise<void>;
	loading: boolean;
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
		const { courses, authors, loadCourses, loadAuthors } = this.props;

		if (!courses.length) {
			loadCourses();
		}

		if (!authors.length) {
			loadAuthors();
		}
	}

	render() {
		return (
			<>
				<h2>Courses</h2>
				{this.props.loading ? (
					<Spinner />
				) : (
					<>
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
				)}
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
		authors: state.authors,
		loading: state.apiCallsInProgress > 0
	};
};

const mapDispatchToProps = {
	loadCourses: courseActions.loadCourses,
	loadAuthors: authorActions.loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
