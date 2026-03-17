const axios = require('axios');

const codes = [
    {
        name: 'java',
        compiler: 'openjdk-jdk-21.0.1+12',
        code: `public class Main {
            public static void main(String[] args) {
                System.out.println("Hello from Java!");
            }
        }`
    },
    {
        name: 'cpp',
        compiler: 'gcc-14.2.0',
        code: `#include <iostream>
        int main() {
            std::cout << "Hello from C++!" << std::endl;
            return 0;
        }`
    },
    {
        name: 'csharp',
        compiler: 'dotnetcore-8.0.402',
        code: `using System;
        class Program {
            static void Main() {
                Console.WriteLine("Hello from C#!");
            }
        }`
    }
];

async function testAll() {
    for (const test of codes) {
        try {
            const res = await axios.post('https://wandbox.org/api/compile.json', {
                compiler: test.compiler,
                code: test.code,
                save: false
            });
            console.log(`\n--- ${test.name} ---`);
            console.log(res.data);
        } catch (e) {
            console.log(`\n--- ${test.name} FAILED ---`);
            console.log(e.response ? e.response.data : e.message);
        }
    }
}

testAll();
