import React from 'react';
import { Course } from '../../redux/types/course.type';
import { Link } from 'react-router-dom';

type Props = {
	courses: Course[];
};

const CourseList: React.FC<Props> = ({ courses }) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th />
					<th>Title</th>
					<th>Author</th>
					<th>Category</th>
				</tr>
			</thead>
			<tbody>
				{courses.map((course) => {
					return (
						<tr key={course.id}>
							<td>
								<a
									className="btn btn-light"
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
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default CourseList;
