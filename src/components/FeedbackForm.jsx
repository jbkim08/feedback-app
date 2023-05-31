import { useContext, useEffect, useState } from 'react';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
	const [text, setText] = useState('');
	const [rating, setRating] = useState(10);
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState('');
	const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

	useEffect(() => {
		//feedbackEdit의 값이 바뀔때마다 실행됨
		if (feedbackEdit.edit === true) {
			setBtnDisabled(false);
			setText(feedbackEdit.item.text);
			setRating(feedbackEdit.item.rating);
		}
	}, [feedbackEdit]);

	const textChange = (e) => {
		const inputText = e.target.value;
		if (inputText === '') {
			setBtnDisabled(true);
			setMessage('');
		} else if (inputText !== '' && inputText.trim().length < 10) {
			setBtnDisabled(true);
			setMessage('10자 이상 적어 주세요');
		} else {
			setBtnDisabled(false);
			setMessage('');
		}
		setText(inputText);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim().length >= 10) {
			const newFeedback = {
				text,
				rating,
			};
			if (feedbackEdit.edit === true) {
				updateFeedback(feedbackEdit.item.id, newFeedback);
			} else {
				addFeedback(newFeedback);
			}

			setBtnDisabled(true); // 👈  저장버튼이 클릭되지 않게 리셋
			setRating(10); //👈 평점을 10점으로 리셋
			setText('');
		}
	};

	return (
		<div className='card'>
			<form onSubmit={handleSubmit}>
				<h2>고객님 우리 서비스를 평가해 주세요.</h2>
				<RatingSelect selectVal={(n) => setRating(n)} />
				<div className='input-group'>
					<input onChange={textChange} type='text' placeholder='리뷰 작성' value={text} />
					<button className='btn btn-primary' type='submit' disabled={btnDisabled}>
						저장
					</button>
				</div>
				<div className='message'>{message}</div>
			</form>
		</div>
	);
}

export default FeedbackForm;
