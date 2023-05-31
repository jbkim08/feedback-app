import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: '컨텍스트 아이템 1 입니다.',
      rating: 10
    },
    {
      id: 2,
      text: '컨텍스트 아이템 2 입니다.',
      rating: 9
    },
    {
      id: 3,
      text: '컨텍스트 아이템 3 입니다.',
      rating: 8
    }
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  //아이템 추가
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };
  //아이템 삭제
  const deleteFeedback = (id) => {
    if (window.confirm('정말로 삭제할까요?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  //수정후 저장하기
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
    //console.log(id, updItem);
  };

  //아이템 업데이트
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return <FeedbackContext.Provider
    value={{
      feedback,
      feedbackEdit,
      setFeedback,
      addFeedback,
      deleteFeedback,
      editFeedback,
      updateFeedback
    }}
  >
    {children}
  </FeedbackContext.Provider>;
};

export default FeedbackContext;