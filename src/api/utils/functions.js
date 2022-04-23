const axios = require("axios");

const functions = {
  isNull: () => null,
  checkValue: (x) => x,
  createUser: () => {
    const user = {
      firstName: "Dork",
      //   age: 22,
    };
    user["lastName"] = "7";
    return user;
  },
  compareLoad: (x, y) => {
    return x + y;
  },
  reverseString: (str) => {
    return str.toLowerCase().split("").reverse().join("");
  },

  chunkArray: (arr, num) => {
    // takes in an array and a number return chunk of it according to the numbers+
    const chunkArr = [];
    for (let i = 0; i <= arr.length; i++) {
      chunkArr.push(arr.splice(0, num));
    }
    arr.length > 0 && chunkArr.push(arr);
    return chunkArr;
  },

  isAnagram: (str1, str2) => {
    return (
      str1.toLowerCase().split("").sort().join("") ===
      str2.toLowerCase().split("").sort().join("")
    );
  },

  fetchUser: async (userId) => {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  },
};

// console.log(functions.chunkArray([1, 2, 3, 4], 1));
// console.log(functions.isAnagram("abc", "bca"));
module.exports = functions;
