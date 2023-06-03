import { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import FeedbackContext from '../context/FeedbackContext';
import Spinner from './shared/Spinner';

function FeedbackList() {
	const { feedback, isLoading } = useContext(FeedbackContext);
	if (!isLoading && (!feedback || feedback.length === 0)) {
		return <p>피드백 데이터가 없습니다.</p>;
	}
	return isLoading ? (
		<Spinner />
	) : (
		<div className='feedback-list'>
			{feedback.map((item) => (
				<FeedbackItem key={item.id} item={item} />
			))}
		</div>
	);
}

export default FeedbackList;
