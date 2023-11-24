const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const existingEnv = fs.readFileSync('.env', 'utf8');
const lines = existingEnv.split('\n');

let newEnvContent = '';

for (const line of lines) {
  if (line.startsWith('SECRET_KEY=')) {
    const newSecret = uuidv4();
    newEnvContent += `SECRET_KEY=${newSecret}\n`;
  } else {
    newEnvContent += `${line}\n`;
  }
}

fs.writeFileSync('.env', newEnvContent);
