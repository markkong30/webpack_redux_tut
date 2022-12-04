import React from 'react';
import TextInput from '../../../common/TextInput';
import SelectInput from '../../../common/SelectInput';
import { Course } from '../../../redux/types/course.type';
import { Author } from '../../../redux/types/author.type';

type Props = {
	course: Course;
	authors: Author[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSave: (e: React.FormEvent<HTMLFormElement>) => void;
	saving: boolean;
	errors: any;
};

const CourseForm: React.FC<Props> = ({
	course,
	authors,
	onSave,
	onChange,
	saving = false,
	errors = {}
}) => {
	return (
		<form
			onSubmit={onSave}
			className="d-flex flex-column gap-3"
			style={{ maxWidth: 800 }}
		>
			<h2>{course.id ? 'Edit' : 'Add'} Course</h2>
			{errors.onSave && (
				<div className="alert alert-danger" role="alert">
					{errors.onSave}
				</div>
			)}
			<TextInput
				name="title"
				label="Title"
				value={course.title}
				onChange={onChange}
				error={errors.title}
			/>

			<SelectInput
				name="authorId"
				label="Author"
				value={course.authorId || ''}
				defaultOption="Select Author"
				options={authors.map((author: Author) => ({
					value: author.id,
					text: author.name
				}))}
				onChange={onChange}
				error={errors.author}
			/>

			<TextInput
				name="category"
				label="Category"
				value={course.category}
				onChange={onChange}
				error={errors.category}
			/>

			<button type="submit" disabled={saving} className="btn btn-primary">
				{saving ? 'Saving...' : 'Save'}
			</button>
		</form>
	);
};

export default CourseForm;
