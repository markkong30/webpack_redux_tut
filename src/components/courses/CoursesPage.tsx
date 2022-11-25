import React from 'react';
import { connect } from 'react-redux';
import type { IAppState } from '../../redux/types/store.type';
import * as courseActions from '../../redux/actions/courseActions';

type Props = {
	dispatch: any;
};
type State = {
	course: {
		title: string;
	};
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

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const course = { ...this.state.course, title: e.target.value };
		this.setState({ course });
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		this.props.dispatch(courseActions.createCourse(this.state.course));

		console.log(this.state.course);
	};

	render() {
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
			</form>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: Props) => {
	return {
		courses: state.courses
	};
};

export default connect(mapStateToProps)(CoursesPage);
