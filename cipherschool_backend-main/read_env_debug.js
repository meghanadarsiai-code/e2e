const fs = require('fs');
try {
    const data = fs.readFileSync('.env', 'utf8');
    fs.writeFileSync('env_dump.txt', data);
} catch (e) {
    fs.writeFileSync('env_dump.txt', "Error: " + e.message);
}
