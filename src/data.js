import namor from "namor";

const newPerson = () => {
  const maritalChance = Math.random();
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30) + 20,
    status: statusChance > 0.5 ? "Employed" : "Unemployed",
    marital:
    maritalChance > 0.66
        ? "Married"
        : "Single"
  };
};

export function data(len = 100) {
  let arr = [];
  for(let i=0; i<len; i++){
    arr.push(newPerson())
  }
  return arr;
}
