import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { apiService } from "../utils/api";
import "./ide_page.css";

const WANDBOX_COMPILERS = {
    javascript: "nodejs-20.17.0",
    python: "cpython-3.12.7",
    java: "openjdk-jdk-21+35",
    csharp: "dotnetcore-8.0.402",
    cpp: "gcc-13.2.0",
    rust: "rust-1.82.0"
};

const DEFAULT_SNIPPETS = {
    javascript: "console.log('Hello, World!');",
    python: "print('Hello, World!')",
    java: 'class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    csharp: 'using System;\n\npublic class Program {\n    public static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
    cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
    rust: 'fn main() {\n    println!("Hello, World!");\n}'
};

function IdePage() {
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState(DEFAULT_SNIPPETS["javascript"]);
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isError, setIsError] = useState(false);
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    };

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        setCode(DEFAULT_SNIPPETS[newLang]);
    };

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        setIsRunning(true);
        setIsError(false);
        setOutput("Running engine...");

        try {
            const response = await axios.post("https://wandbox.org/api/compile.json", {
                code: sourceCode,
                compiler: WANDBOX_COMPILERS[language],
            });

            const { status, program_message, program_error, compiler_error } = response.data;

            if (status !== "0" || compiler_error) {
                setIsError(true);
                setOutput(compiler_error || program_error || "Execution failed.");
            } else {
                setIsError(!!program_error);
                setOutput(program_message || program_error || "Execution completed with no output.");

                // Silently log activity for heatmap
                try {
                    apiService.users.logActivity().catch(() => { });
                } catch (e) { }
            }
        } catch (error) {
            setIsError(true);
            setOutput(error.response?.data?.message || "An error occurred while connecting to the execution engine.");
        } finally {
            setIsRunning(false);
        }
    };

    const isDarkMode = document.body.classList.contains("dark-mode");

    return (
        <div className="gfg-container mt-4 ide-container">
            <div className="ide-header mb-3 d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="gfg-header m-0">Sandbox IDE</h2>
                    <p className="text-muted m-0">Write, test, and execute code directly in your browser.</p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <select
                        className="form-select w-auto"
                        value={language}
                        onChange={handleLanguageChange}
                        disabled={isRunning}
                    >
                        <option value="javascript">JavaScript (Node.js)</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="csharp">C#</option>
                        <option value="rust">Rust</option>
                    </select>
                    <button
                        className="gfg-btn-primary d-flex align-items-center gap-2"
                        onClick={runCode}
                        disabled={isRunning}
                    >
                        {isRunning ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                            </svg>
                        )}
                        Run Code
                    </button>
                </div>
            </div>

            <div className="row g-3" style={{ height: "calc(100vh - 250px)", minHeight: "500px" }}>
                <div className="col-12 col-lg-7 h-100">
                    <div className="gfg-card h-100 p-0 overflow-hidden d-flex flex-column">
                        <div className="bg-light px-3 py-2 border-bottom d-flex align-items-center">
                            <span className="fw-bold small text-muted text-uppercase">Editor.js</span>
                        </div>
                        <div className="flex-grow-1 position-relative">
                            <Editor
                                height="100%"
                                language={language}
                                theme={isDarkMode ? "vs-dark" : "light"}
                                value={code}
                                onMount={handleEditorDidMount}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    wordWrap: "on",
                                    automaticLayout: true,
                                    scrollBeyondLastLine: false,
                                    padding: { top: 16 }
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-5 h-100">
                    <div className="gfg-card h-100 p-0 d-flex flex-column">
                        <div className="bg-light px-3 py-2 border-bottom d-flex align-items-center justify-content-between">
                            <span className="fw-bold small text-muted text-uppercase">Terminal Output</span>
                            <button
                                className="btn btn-sm btn-link text-muted p-0 text-decoration-none"
                                onClick={() => setOutput("")}
                            >
                                Clear
                            </button>
                        </div>
                        <div className="flex-grow-1 p-3 bg-dark text-light overflow-auto" style={{ fontFamily: "monospace", fontSize: "0.9rem" }}>
                            <pre className={`m-0 ${isError ? "text-danger" : ""}`} style={{ whiteSpace: "pre-wrap" }}>
                                {output || "Output will appear here..."}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IdePage;
