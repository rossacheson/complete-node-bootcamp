const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject('I could not file that file 😢');
      }
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject('I could not write that file 😢');
      }

      resolve('success');
    });
  });
};

const getDogPics = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // don't await each in order, instead join them up to be processed simultaneously
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const images = all.map((res) => res.body.message);
    console.log(images);

    await writeFilePro('dog-img.txt', images.join('\n'));
    console.log('Random dog images saved to file!');
  } catch (err) {
    console.log(err);
    throw err;
  }

  return '2: READY 🐶';
};

// IIFE with async await
(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPics();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('ERROR 💥');
  }
})();
