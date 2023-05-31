import { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackList() {
	const { feedback, handleDelete } = useContext(FeedbackContext);
	if (!feedback || feedback.length === 0) {
		return <p>피드백 데이터가 없습니다.</p>;
	}
	return (
		<div className='feedback-list'>
			{feedback.map((item) => (
				<FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
			))}
		</div>
	);
}

export default FeedbackList;
