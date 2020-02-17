
const validateForm = (args) => {
 return isEmail(args.email) && isPass(args.pass) && args.pass === args.repass
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email)
}
function isPass(pass) {
  var regex = /[a-zA-Z0-9]/;
  return regex.test(pass)
}

module.exports = validateForm
