import { createContext, useEffect, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });
  useEffect(() => {
    fetchFeedback();
  }, []);
  // 피드벡데이터 받기
  const fetchFeedback = async () => {
    const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`);
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  //아이템 추가
  const addFeedback = async (newFeedback) => {
    const response = await fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback)
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };
  //아이템 삭제
  const deleteFeedback = async (id) => {
    if (window.confirm('정말로 삭제할까요?')) {
      await fetch(`http://localhost:5000/feedback/${id}`, { method: 'DELETE' });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  //수정후 저장하기
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`http://localhost:5000/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? data : item))
    );
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
      isLoading,
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