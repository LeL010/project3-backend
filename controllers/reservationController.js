const BaseController = require("./baseController");

class ReservationsController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
  }

  async insertOne(req, res) {
    const { reservationDate, numOfGuests, remarks, userEmail, userName } = req.body;
    const { restaurantId } = req.params;
    try {
      const [user] = await this.userModel.findOrCreate({
        where: { email: userEmail },
        defaults: {
          username: userName,
          email: userEmail,
        },
      });

      const newReservation = await this.model.create({
        reservationDate: reservationDate,
        numOfGuests: numOfGuests,
        remarks: remarks,
        userId: user.id,
        restaurantId: restaurantId,
      });
      
      return res.json(newReservation);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    const id = req.params.reservationId;
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
