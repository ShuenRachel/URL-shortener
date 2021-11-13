const urlModel = require('../models/url')

function generateCode() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  const collection = (lowerCaseLetters + upperCaseLetters + numbers).split('')

  let code = ''

  for (let i = 1; i <= 5; i++) {
    code += sample(collection)
  }

  if (!checkIfCodeExisted(code)) {
    generateCode()
  }

  return code
}

function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function checkIfCodeExisted(code) {
  urlModel.findOne({ code })
    .lean()
    .then(data => {
      return data
    })
  return code
}

module.exports = generateCode
