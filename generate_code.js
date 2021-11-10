function generateCode(options) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  const collection = (lowerCaseLetters + upperCaseLetters + numbers).split('')

  // generate code
  let code = ''

  for (let i = 1; i <= 5; i++) {
    code += sample(collection)

  }

  return code
}

function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

module.exports = generateCode
