const BaseController = require("./baseController");
const { Op } = require("sequelize");

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
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAll(req, res) {
    const searchString = req.query.search;
    let filters = {};
    if (searchString !== undefined) {
      filters = {
        [Op.or]: [
          { name: { [Op.iLike]: "%" + searchString.toLowerCase() + "%" } },
          {
            location: { [Op.iLike]: "%" + searchString.toLowerCase() + "%" },
          },
          {
            openingHours: {
              [Op.iLike]: "%" + searchString.toLowerCase() + "%",
            },
          },
          { cuisine: { [Op.iLike]: "%" + searchString.toLowerCase() + "%" } },
          { price: { [Op.iLike]: "%" + searchString.toLowerCase() + "%" } },
        ],
      };
    }
    try {
      const output = await this.model.findAll({
        //attributes: ["name", "location", "openingHours", "cuisine", "price", "createdAt", "updatedAt"],
        where: filters,
        order: [["updatedAt", "asc"]],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = RestaurantsController;
