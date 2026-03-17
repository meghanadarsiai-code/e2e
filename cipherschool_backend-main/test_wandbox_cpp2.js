const axios = require('axios');

async function test() {
    try {
        const res = await axios.post('https://wandbox.org/api/compile.json', {
            compiler: 'gcc-14.2.0',
            code: '#include <iostream>\nint main() {\n    std::cout << "C++!" << std::endl;\n    return 0;\n}',
            save: false
        });
        console.log("C++ Response:", JSON.stringify(res.data, null, 2));
    } catch (e) {
        console.log("Error:", e.response ? e.response.data : e.message);
    }
}
test();
