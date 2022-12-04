import React from 'react';
import { Course } from '../../redux/types/course.type';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

type Props = {
	courses: Course[];
	handleDelete: (course: Course) => void;
};

const CourseList: React.FC<Props> = ({ courses, handleDelete }) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th />
					<th>Title</th>
					<th>Author</th>
					<th>Category</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{courses.map((course) => {
					return (
						<tr key={course.id} className={styles.row}>
							<td>
								<a
									className="btn btn-info"
									href={'http://pluralsight.com/courses/' + course.slug}
								>
									Watch
								</a>
							</td>
							<td>
								<Link to={'/course/' + course.slug}>{course.title}</Link>
							</td>
							<td>{course.author}</td>
							<td>{course.category}</td>
							<td>
								<button
									className="btn btn-outline-danger"
									onClick={() => handleDelete(course)}
								>
									Delete
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default CourseList;
