function displayA() {
  console.log("A");
}

function displayB() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("B");
      resolve();
    }, 2000);
  });
}

function displayC() {
  console.log("C");
}

async function runSequence() {
  displayA();
  await displayB();
  displayC();
}

runSequence();
