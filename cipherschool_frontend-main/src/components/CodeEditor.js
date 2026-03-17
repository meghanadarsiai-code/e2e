import React, { useState } from "react";

function CodeEditor({ onSubmit }) {

  const [code, setCode] = useState("");

  return (
    <div>

      <textarea
        className="form-control"
        rows="6"
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <div className="mt-2">

        <button
          className="btn btn-success"
          onClick={() => onSubmit(code)}
        >
          Submit Code
        </button>

      </div>

    </div>
  );
}

export default CodeEditor;