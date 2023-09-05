const BaseController = require("./baseController");

class RestaurantsController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getOne(req, res) {
    const id = req.params.restaurantId;
    try {
      const output = await this.model.findByPk(id);
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = RestaurantsController;
