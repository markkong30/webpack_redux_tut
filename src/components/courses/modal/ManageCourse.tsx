import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import type { IAppState } from '../../../redux/types/store.type';
import type { Course } from '../../../redux/types/course.type';
import * as courseActions from '../../../redux/actions/courseActions';
import * as authorActions from '../../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import { useHistory } from 'react-router-dom';
import { Author } from '../../../redux/types/author.type';
import type { RouteComponentProps } from 'react-router-dom';

type Props = {
	loadCourses: () => void;
	courses: Course[];
	authors: Author[];
	course: Course;
	loadAuthors: () => void;
	saveCourse: (course: Course) => Promise<void>;
};
interface MatchParams {
	slug: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
	slug: string;
}

const ManageCourse: React.FC<Props> = ({
	loadCourses,
	courses,
	authors,
	loadAuthors,
	saveCourse,
	...props
}) => {
	const [course, setCourse] = useState<Course>({ ...props.course });
	const [errors, setErrors] = useState({});
	const history = useHistory();
	// const {slug}: any = useParams();
	useEffect(() => {
		if (!courses.length) {
			loadCourses();
		} else {
			setCourse({ ...props.course });
		}
		loadAuthors();
	}, [props.course]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setCourse((prevCourse) => ({
			...prevCourse,
			[name]: name === 'authorId' ? parseInt(value, 10) : value
		}));
	};

	const onSave = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		saveCourse(course).then(() => {
			history.push('/courses');
		});
	};

	return (
		<CourseForm
			course={course}
			authors={authors}
			errors={errors}
			onChange={onChange}
			onSave={onSave}
			saving={false}
		/>
	);
};

const mapStateToProps = (state: IAppState, ownProps: MatchProps) => {
	const slug = ownProps.match.params.slug;
	const course = slug
		? state.courses.find((course) => course.slug === slug)
		: { title: '', author: '', category: '', slug: '' };
	return {
		courses: state.courses,
		authors: state.authors,
		course: course
	};
};

const mapDispatchToProps = {
	loadCourses: courseActions.loadCourses,
	loadAuthors: authorActions.loadAuthors,
	saveCourse: courseActions.saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);
