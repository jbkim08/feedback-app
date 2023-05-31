import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import { FeedbackProvider } from "./context/FeedbackContext";
//import FeedbackContext from "./context/FeedbackContext";
//import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";


function App() {
  //const [feedback, setFeedback] = useState(FeedbackData);
  // const addFeedback = (newFeedback) => {
  //   newFeedback.id = uuidv4();
  //   setFeedback([newFeedback, ...feedback]);
  // };
  // const handleDelete = (id) => {
  //   if (window.confirm('정말로 삭제할까요?')) {
  //     setFeedback(feedback.filter((item) => item.id !== id));
  //   }
  // };
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              } />

            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;