/**
 * Convert string to title case ("hello world" -> "Hello World")
 * @param {string} str string to title case
 * @returns {string} title cased string
 */
export const toTitleCase = (str) => {
  const words = str.toLowerCase().split(" ");
  words.forEach((word, index) => {
    words[index] = word[0].toUpperCase() + word.slice(1);
  });

  return words.join(" ");
};
