const axios = require("axios");

axios.post("https://wandbox.org/api/compile.json", {
    code: "console.log('Hello World!');",
    compiler: "nodejs-20.17.0"
}).then(res => {
    console.log(JSON.stringify(res.data, null, 2));
}).catch(console.error);
