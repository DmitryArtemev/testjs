const {Router} = require('express')
const router = Router()
const Todo = require('../models/Todo')
const validateForm = require('../public/main')
const Bcrypt = require("bcryptjs")

router.get('/', async (req, res) => {
  res.render('create', {
    formreg: true,
    title: 'Рестрация/Вход',
  })
})

router.post('/create', async (req, res) => {

    if (validateForm(req.body)) {
      const query = await Todo.findOne({}).where({email: req.body.email})
      if (query !== null) {
        res.render('create', {
          formreg: true,
          title: 'Вход',
          textreg: 'E-mail уже используеться',
        })
      } else {
        const todo = new Todo({
          name: req.body.name,
          email: req.body.email,
          pass: Bcrypt.hashSync(req.body.pass, 10),
        })
        await todo.save()
        res.render('create', {
          formreg: false,
          title: 'Вход',
          textlog: 'Регистрация прошла успешо'
        })
       }
    } else {
      res.render('create', {
        formreg: true,
        title: 'Рестрация/Вход',
        textreg: 'Поля формы заполнены не верно',
      })
    }
})
router.post('/getuser', async (req, res) => {

    const query = await Todo.findOne({}).where({email: req.body.email})
    if (query && Bcrypt.compareSync(req.body.pass, query.pass)) {
      let result =  query.name
      res.render('index', {
        title: 'Вход',
        result,
      }) } else {
        res.render('create', {
          formreg: true,
          title: 'Вход',
          textlog: 'Неверный E-mail или Пароль'
        })
      }


})

module.exports = router
