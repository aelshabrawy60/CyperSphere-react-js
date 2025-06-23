import { useState, useEffect } from 'react';

export default function QuizComponent({title, description, lessons = null, courseId = null, studentId = null}) {
  const [courseTitle, setCourseTitle] = useState(title);
  const [courseDescription, setCourseDescription] = useState(description);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [apiKey, setApiKey] = useState('AIzaSyB0RJ2qHWdJMcmnAIAlLJq8Awo66xuH21c');
  const [error, setError] = useState('');
  const [completionStatus, setCompletionStatus] = useState(null);
  const [completionLoading, setCompletionLoading] = useState(false);

  // Generate questions using Gemini AI API
  const generateQuestions = async () => {
    if (!apiKey) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const numberOfQuestions = lessons.length > 5 ? lessons : 5
      // Structure the prompt for Gemini to generate quiz questions
      const prompt = `
        Generate ${numberOfQuestions} multiple-choice questions for a quiz on the following topic:
        
        Course Title: ${courseTitle}
        Course Description: ${courseDescription}
        Course Lessons: ${lessons}
        
        For each question, provide:
        1. A clear question
        2. Four possible answer options
        3. The index of the correct answer (0-3)
        
        Format the response as a JSON array with the following structure:
        [
          {
            "question": "Question text here?",
            "options": [
              "First option",
              "Second option",
              "Third option",
              "Fourth option"
            ],
            "correctAnswer": 2  // Index of correct answer (0-3)
          },
          // more questions...
        ]
      `;

      // Call Gemini API
      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the text response from Gemini
      const textResponse = data.candidates[0].content.parts[0].text;
      
      // Find the JSON part of the response (Gemini might include explanatory text)
      const jsonMatch = textResponse.match(/\[[\s\S]*\]/);
      
      if (!jsonMatch) {
        throw new Error("Couldn't parse JSON from API response");
      }
      
      // Parse the JSON and add IDs to questions
      const parsedQuestions = JSON.parse(jsonMatch[0]);
      const generatedQuestions = parsedQuestions.map((q, index) => ({
        ...q,
        id: index + 1
      }));
      
      setQuestions(generatedQuestions);
      setQuizGenerated(true);
      setQuizSubmitted(false);
      setCurrentAnswers({});
      setScore(0);
      setCompletionStatus(null);
    } catch (err) {
      console.error('Error generating questions:', err);
      setError(`Failed to generate questions: ${err.message}`);
      // Fallback to sample questions if the API fails
      setQuestions([]);
      setQuizGenerated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelection = (questionId, optionIndex) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Function to call the course completion API
  const markCourseAsCompleted = async () => {
    if (!studentId || !courseId) return;
    
    setCompletionLoading(true);
    
    try {
      // Get auth token from localStorage
      const authToken = localStorage.getItem('authToken');
      
      const response = await fetch(`https://cybersphere7.runasp.net/api/Progress/complete-course?studentId=${studentId}&courseId=${courseId}`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Authorization': authToken ? `Bearer ${authToken}` : ''
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setCompletionStatus({
        success: true,
        message: data.message || 'Course marked as completed successfully.'
      });
    } catch (err) {
      console.error('Error marking course as completed:', err);
      setCompletionStatus({
        success: false,
        message: `Failed to mark course as completed: ${err.message}`
      });
    } finally {
      setCompletionLoading(false);
    }
  };

  const handleSubmitQuiz = () => {
    let newScore = 0;
    questions.forEach(question => {
      if (currentAnswers[question.id] === question.correctAnswer) {
        newScore++;
      }
    });
    
    setScore(newScore);
    setQuizSubmitted(true);
    
    // Check if student passed the quiz (score >= 70%)
    const passingThreshold = questions.length * 0.6;
    const passed = newScore >= passingThreshold;
    
    // If studentId and courseId exist and student passed, mark course as completed
    if (studentId && courseId && passed) {
      markCourseAsCompleted();
    }
  };

  const resetQuiz = () => {
    setQuizGenerated(false);
    setQuizSubmitted(false);
    setCurrentAnswers({});
    setScore(0);
    setQuestions([]);
    setCompletionStatus(null);
  };

  const getOptionClass = (questionId, optionIndex) => {
    if (!quizSubmitted) {
      return currentAnswers[questionId] === optionIndex 
        ? 'bg-blue-800 border-blue-500' 
        : 'bg-gray-800 hover:bg-gray-700';
    }
    
    const question = questions.find(q => q.id === questionId);
    if (question.correctAnswer === optionIndex) {
      return 'bg-green-800 border-green-500';
    } else if (currentAnswers[questionId] === optionIndex) {
      return 'bg-red-800 border-red-500';
    } else {
      return 'bg-gray-800 opacity-50';
    }
  };

  return (
    <div className="flex flex-col min-h-scree text-gray-100">
      <div className="w-full mx-auto bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-blue-300 mb-6">Interactive Quiz</h1>
        
        {!quizGenerated ? (
          <div className="space-y-6">
            
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg p-3 transition duration-200"
              onClick={generateQuestions}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Starting...
                </span>
              ) : 'Start Quiz'}
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-400 mb-8">{courseDescription}</p>
            
            <div className="space-y-8 mb-8">
              {questions.map((question, qIndex) => (
                <div key={question.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-medium mb-4">
                    <span className="text-blue-400 mr-2">{qIndex + 1}.</span> {question.question}
                  </h3>
                  
                  <div className="space-y-3">
                    {question.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        className={`w-full text-left p-4 rounded-lg border ${getOptionClass(question.id, oIndex)} transition-colors duration-200 flex items-center`}
                        onClick={() => !quizSubmitted && handleAnswerSelection(question.id, oIndex)}
                        disabled={quizSubmitted}
                      >
                        <span className="inline-block w-6 h-6 rounded-full bg-gray-700 text-center mr-3 border border-gray-600 flex-shrink-0">
                          {String.fromCharCode(65 + oIndex)}
                        </span>
                        <span>{option}</span>
                        {quizSubmitted && question.correctAnswer === oIndex && (
                          <span className="ml-auto text-green-400">✓</span>
                        )}
                        {quizSubmitted && currentAnswers[question.id] === oIndex && question.correctAnswer !== oIndex && (
                          <span className="ml-auto text-red-400">✗</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {!quizSubmitted ? (
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg p-4 transition duration-200"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(currentAnswers).length !== questions.length}
              >
                Submit Quiz
              </button>
            ) : (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">
                  Your Score: <span className="text-blue-400">{score}</span>/{questions.length}
                </div>
                <div className="text-xl mb-4">
                  {score === questions.length ? 'Perfect score! 🎉' : 
                   score >= questions.length * 0.7 ? 'Great job! 👏' : 
                   score >= questions.length * 0.5 ? 'Good effort! 👍' : 
                   'Keep practicing! 💪'}
                </div>
                
                {/* Course completion status message */}
                {completionStatus && (
                  <div className={`mt-4 mb-4 p-3 rounded-lg ${completionStatus.success ? 'bg-green-900/50 border border-green-700 text-green-200' : 'bg-red-900/50 border border-red-700 text-red-200'}`}>
                    {completionStatus.message}
                  </div>
                )}
                
                {/* Show loading indicator while API call is in progress */}
                {completionLoading && (
                  <div className="flex items-center justify-center mt-4 mb-4">
                    <svg className="animate-spin h-5 w-5 text-blue-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Updating course progress...</span>
                  </div>
                )}
                
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 transition duration-200"
                  onClick={() => {
                    setQuizSubmitted(false);
                    setCurrentAnswers({});
                  }}
                >
                  Retry Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}