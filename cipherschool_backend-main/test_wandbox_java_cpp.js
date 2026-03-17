const axios = require('axios');

async function test() {
    try {
        const r1 = await axios.post('https://wandbox.org/api/compile.json', {
            compiler: 'openjdk-jdk-21+35',
            code: 'class Main {\n public static void main(String[] args) {\n System.out.println("Java works");\n }\n}'
        });
        console.log('Java:', r1.data);

        const r2 = await axios.post('https://wandbox.org/api/compile.json', {
            compiler: 'gcc-14.2.0-c++',
            code: '#include <iostream>\nint main() { std::cout << "C++ works" << std::endl; return 0; }'
        });
        console.log('C++:', r2.data);
    } catch (e) {
        console.error(e.response?.data || e.message);
    }
}
test();
