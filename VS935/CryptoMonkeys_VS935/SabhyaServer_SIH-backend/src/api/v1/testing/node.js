const { spawn } = require('child_process');
const python = spawn('python', ['./test.py']);
// collect data from script

python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
    console.log(dataToSend);
});
// in close event we are sure that stream from child process is closed
python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
});
