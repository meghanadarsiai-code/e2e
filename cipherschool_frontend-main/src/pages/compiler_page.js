import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

// Simple mapping of language names to Piston API versions/aliases
const LANGUAGES = {
    python: { name: 'python', version: '3.10.0', alias: 'python3' },
    java: { name: 'java', version: '15.0.2', alias: 'java' },
    c: { name: 'c', version: '10.2.0', alias: 'gcc' },
    cpp: { name: 'cpp', version: '10.2.0', alias: 'g++' },
    javascript: { name: 'javascript', version: '18.15.0', alias: 'node' }
};

const BOILERPLATES = {
    python: `print("Hello, World!")

def main():
    for i in range(5):
        print(f"Count: {i}")

if __name__ == "__main__":
    main()
`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`,
    c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
`,
    cpp: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
`,
    javascript: `console.log("Hello, World!");

function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("CipherSchools"));
`
};

function CompilerPage() {
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState(BOILERPLATES['python']);
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        setLanguage(lang);
        setCode(BOILERPLATES[lang]);
        setOutput('');
    };

    const runCode = async () => {
        setIsLoading(true);
        setOutput('Running...');

        try {
            const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
                language: LANGUAGES[language].name,
                version: LANGUAGES[language].version,
                files: [
                    {
                        content: code
                    }
                ]
            });

            const { run } = response.data;
            setOutput(run.output);

            if (run.stderr) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Execution Warning',
                    text: 'There was some output to stderr.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }

        } catch (error) {
            console.error("Error running code:", error);
            setOutput('Error executing code. Please try again later.');
            Swal.fire({
                icon: 'error',
                title: 'Execution Failed',
                text: error.message || 'Unknown error occurred'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="mt-5 pt-4">
            <h2 className="gfg-header mb-4">🚀 Live Code Compiler</h2>

            <Row>
                <Col md={12} className="mb-3">
                    <Card className="shadow-sm border-0" style={{ borderRadius: '12px' }}>
                        <Card.Body className="d-flex align-items-center gap-3 bg-light rounded-top">
                            <Form.Select
                                value={language}
                                onChange={handleLanguageChange}
                                style={{ width: '200px', fontWeight: 'bold' }}
                                className="border-0 shadow-none"
                            >
                                <option value="python">Python (3.x)</option>
                                <option value="java">Java (JDK 15)</option>
                                <option value="c">C (GCC)</option>
                                <option value="cpp">C++ (G++)</option>
                                <option value="javascript">JavaScript (Node.js)</option>
                            </Form.Select>

                            <Button
                                variant="success"
                                onClick={runCode}
                                disabled={isLoading}
                                className="px-4 fw-bold"
                                style={{ background: 'var(--ciph-success)', border: 'none' }}
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                        Running...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-play me-2"></i> Run Code
                                    </>
                                )}
                            </Button>
                        </Card.Body>

                        <div className="p-0">
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                                    fontSize: '14px',
                                    border: 'none',
                                    padding: '20px',
                                    outline: 'none',
                                    backgroundColor: '#1e1e1e',
                                    color: '#d4d4d4',
                                    resize: 'none',
                                    lineHeight: '1.5'
                                }}
                                spellCheck="false"
                            />
                        </div>
                    </Card>
                </Col>

                <Col md={12}>
                    <Card className="shadow-sm border-0" style={{ borderRadius: '12px' }}>
                        <Card.Header className="bg-white border-bottom fw-bold">
                            <i className="fa-solid fa-terminal me-2"></i> Output
                        </Card.Header>
                        <Card.Body className="p-0">
                            <pre
                                style={{
                                    minHeight: '150px',
                                    maxHeight: '300px',
                                    overflow: 'auto',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '0 0 12px 12px',
                                    padding: '20px',
                                    margin: 0,
                                    fontFamily: 'Consolas, Monaco, monospace',
                                    color: output.includes('Error') ? 'red' : '#333',
                                    whiteSpace: 'pre-wrap'
                                }}
                            >
                                {output || "Run code to see output..."}
                            </pre>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CompilerPage;
