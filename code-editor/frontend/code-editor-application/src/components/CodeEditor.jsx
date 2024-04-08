import { useState, useEffect, useRef } from "react";
import "../App.css";
import { Editor } from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";

const CodeEditor = () => {
  const editorOptions = {
    minimap: {
      enabled: false,
    },
    fontSize: 16,
  };

  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [output, setOutput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const editorContentRef = useRef("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:1001/python-question");
        const data = await response.json();
        // Convert the _id field to id
        const formattedQuestions = data.map((q) => ({
          id: q._id.$oid,
          question: q.question,
          output: q.output,
          userCode: q.code || "",
          editorContent: q.code || "",
        }));
        setQuestions(formattedQuestions);
        setSelectedQuestion(formattedQuestions[0]);
        setEditorContent(formattedQuestions[0].editorContent);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (selectedQuestion) {
      setEditorContent(selectedQuestion.editorContent);
    } else {
      setEditorContent("");
    }
  }, [selectedQuestion]);

  const handleQuestionClick = (question) => {
    setSelectedQuestion({ ...question, editorContent: question.editorContent });
    setEditorContent(question.editorContent);
  };
  
  const handleRunCode = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:1001/${selectedLanguage}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: selectedQuestion.editorContent,
          questionId: selectedQuestion.id,
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        setOutput(data.output);
      } else {
        setOutput(`Error: ${data.message}`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };
  
  const handleSubmitCode = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:1001/${selectedLanguage}-submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: selectedQuestion.editorContent,
          questionId: selectedQuestion.id,
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        const updatedQuestions = questions.map((q) => {
          if (q.id === selectedQuestion.id) {
            return { ...q, userCode: selectedQuestion.editorContent, editorContent: selectedQuestion.editorContent };
          }
          return q;
        });
        setQuestions(updatedQuestions);
        setSelectedQuestion({ ...selectedQuestion, userCode: selectedQuestion.editorContent, editorContent: selectedQuestion.editorContent });
        console.log("Code submitted:", selectedQuestion.editorContent);
      } else {
        setOutput(`Error: ${data.message}`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };
  const handleDownloadCode = () => {
    // Download the code in the editor
    const element = document.createElement("a");
    const file = new Blob([editorContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `code.${selectedLanguage}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };
  return (
    <div className="app-container">
      <div className="main-container">
        <div className="top-content">
          <div className="top-header">
            <div className="logo">
              <h3>Code Editor</h3>
            </div>
            <div className="top-buttons">
              <button className="top-btn run-btn" onClick={handleRunCode}>
                Run
              </button>
              <button className="top-btn" onClick={handleSubmitCode}>
                Submit
              </button>
              <button className="top-btn" onClick={handleDownloadCode}>
                Download
              </button>
              <div className="dropdown">
                <button className="top-btn dropdown-btn">
                  {selectedLanguage.toLocaleUpperCase()}
                </button>
                <div className="dropdown-content">
                <a href="#" onClick={() => handleLanguageChange("python")}>
                    Python
                  </a>
                  <a
                    href="#"
                    onClick={() => handleLanguageChange("javascript")}
                  >
                    JavaScript
                  </a>
                  
                  <a href="#" onClick={() => handleLanguageChange("java")}>
                    Java
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="editor-container">
          <Editor
            height="100%"
            width="100%"
            value={editorContent}
            onChange={(value) => {
              setEditorContent(value || "");
              editorContentRef.current = value || "";
              const updatedQuestions = questions.map((q) => {
                if (q.id === selectedQuestion.id) {
                  return { ...q, editorContent: value || "" };
                }
                return q;
              });
              setQuestions(updatedQuestions);
              setSelectedQuestion({ ...selectedQuestion, editorContent: value || "" });
            }}
            language={selectedLanguage}
            theme="vs-dark"
            options={editorOptions}
          />
          </div>
        </div>
        <div className="bottom-content">
          <h3>Output</h3>
           
            <div className="output-container">
            <pre>{output}</pre>
            </div>
        </div>
      </div>
      <div className="sidebar-container">
        <h2>Questions</h2>
        <div className="question-list">
  {questions.map((question) => (
    <div
      key={question.id}
      className={`question-item ${
        selectedQuestion?.id === question.id ? "selected" : ""
      }`}
      onClick={() => handleQuestionClick(question)}
    >
      <div className="question-header">
        <h4>{question.question}</h4>
        <span className="expand-icon">
          {selectedQuestion?.id === question.id ? "-" : "+"}
        </span>
      </div>
      {selectedQuestion?.id === question.id && (
        <div className="question-content">
          <ReactMarkdown>{question.output}</ReactMarkdown>
        </div>
      )}
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default CodeEditor;
