const bcrypt = require('bcrypt');
const User = require("../models/user")

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({}, "-__v -password")

      res.json({
        message: "success get data user",
        data: users
      })
    } catch (error) {
      console.log(error);
    }
  },

  getUserByID: (req, res) => {
    User.findById({
      _id: req.params.id
    }, (error, result) => {
      if(error) {
        res.status(400).send({
          message: 'data tidak ditemukan',
        })
      }else{
        res.status(200).send({
          message: 'tampilkan data',
          result
        })
      }
    }
    )
  },

  addUser: (req, res) => {
    const data = req.body

    const saltRounds = 10
    const hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash

    const user = new User(data)

    // console.log(user)
    user.save()

    res.json({
      message: "data has been created!!",
    })
  },

  deleteUserByID: (req, res) => {
    User.deleteOne({
      _id: req.params.id
    }, (error, result) =>{
      if(error) {
        res.status(400).send({
          message: 'data gagal terhapus',
        })
      } else {
        res.status(200).send({
          message: 'data telah terhapus',
        })
      }
    })
  },

  deleteAllUser: (req, res) => {
    User.deleteMany({}, (error, result) =>{
      if(error) {
        res.status(400).send({
          message: 'data gagal terhapus',
        })
      } else {
        res.status(200).send({
          message: 'data telah terhapus',
        })
      }
    })
  },

  updateUserByID: (req, res) => {
    User.findByIdAndUpdate({
      _id: req.params.id
    }, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address
    }, (error, result) =>{
      if(error){
        res.status(400).send({
          message: 'data tidak dapat di update'
        })
      }else{
        res.status(200).send({
          message: 'data berhasil di update',
        })
      }
    })
  },

  register: (req, res) => {
    const data = req.body

    const saltRounds = 10
    const hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash

    const user = new User(data)

    user.save()

    res.json({
      message: "registrasi berhasil",
    })
  },

  login: async (req, res) => {
    const data = req.body

    const user = await User.findOne({ email: data.email })

    const checkPwd = bcrypt.compareSync(data.password, user.password)

    if (checkPwd) {
      res.json({
        message: "anda berhasil login",
        token: "masukkan token"
      })
    } else {
      res.json({
        message: "login gagal",
      })
    }
  },
}