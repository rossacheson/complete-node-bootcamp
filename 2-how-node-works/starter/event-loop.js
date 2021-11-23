const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 2;

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('----- Below logs come from event loop -----');
  setTimeout(() => console.log('Timer 2 finished'), 0);
  setTimeout(() => console.log('Timer 3 finished'), 3000);
  setImmediate(() => console.log('Immediate 2 finished'));
  process.nextTick(() => console.log('Process.nextTick'));

  // blocking/sync version
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha256');
  console.log(Date.now() - start, 'Password encrypted sync');
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha256');
  console.log(Date.now() - start, 'Password encrypted sync');

  // async version
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha256', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha256', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha256', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha256', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
});

console.log('Hello from the top-level code');
