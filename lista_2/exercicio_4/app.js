import { exec } from 'child_process';

const currentPid = process.pid;

exec('ps auxw', (error, stdout, stderr) => {
  if (error) {
    console.error('Error executing command:', error.message);
    return;
  }

  if (stderr) {
    console.error('stderr:', stderr);
    return;
  }

  const lines = stdout.split('\n');

  const nodeProcessLine = lines.find(line =>
    line.includes(` ${currentPid} `)
  );

  if (nodeProcessLine) {
    console.log('Node process found:');
    console.log(nodeProcessLine);
  } else {
    console.log('Node process not found.');
  }
});
