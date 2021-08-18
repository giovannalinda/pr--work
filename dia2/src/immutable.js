const john = {
  name: 'John',
  surname: 'Doe',
  age: 30,
  hobbies: ['Surf', 'Design'],
}
// ex 01
const jane = {
  ...john,
  name: "Jane",
  // hobbies: john.hobbies.concat("MuayThai", "Programming"),
  hobbies: [...john.hobbies, "MuayThai", "Programming"],
};

console.log('John:', john)
console.log('Jane:', jane)
