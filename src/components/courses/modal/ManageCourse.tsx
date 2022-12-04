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
import Spinner from '../../../common/Spinner';
import { toast } from 'react-toastify';

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
	const [saving, setSaving] = useState<boolean>(false);
	const history = useHistory();

	useEffect(() => {
		if (!courses.length && !authors.length) {
			loadCourses();
			loadAuthors();
		} else {
			setCourse({ ...props.course });
		}
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
		setSaving(true);

		saveCourse(course)
			.then(() => {
				setSaving(false);
				toast.success('Course saved!');
				history.push('/courses');
			})
			.catch((err) => {
				setSaving(false);
				setErrors({ onSave: err.message });
			});
	};

	if (!courses.length || !authors.length) {
		return <Spinner />;
	}

	return (
		<CourseForm
			course={course}
			authors={authors}
			errors={errors}
			onChange={onChange}
			onSave={onSave}
			saving={saving}
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
