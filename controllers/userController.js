const BaseController = require("./baseController");

class ReservationsController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
  }

  async insertOne(req, res) {
    const { username, email, password } = req.body;
    try {
      const newUser = await this.model.create({
        username: username,
        email: email,
        password: password,
      });
      return res.json(newUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    const id = req.params.userId;
    try {
      const output = await this.model.findByPk(id);
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ReservationsController;
