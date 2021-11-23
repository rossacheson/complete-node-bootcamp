const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1 -- load all the data
  // fs.readFile('test-file.txt', 'utf8', (err, data) => {
  //   if (err) {
  //     console.error(err);
  //   }

  //   res.end(data);
  // });

  // Solution 2 -- stream the data
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });

  // readable.on('end', () => {
  //   res.end();
  // });

  // readable.on('error', (err) => {
  //   console.error(err);
  //   res.statusCode = 500;
  //   res.end('File not found');
  // });

  // Solution 3 -- stream the the data, fix back-pressure issue
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000');
});
