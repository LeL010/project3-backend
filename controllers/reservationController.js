const BaseController = require("./baseController");

class ReservationsController extends BaseController {
  constructor(model, userModel, restaurantModel) {
    super(model);
    this.userModel = userModel;
    this.restaurantModel = restaurantModel;
  }

  async insertOne(req, res) {
    const { reservationDate, numOfGuests, remarks, userEmail, userName } =
      req.body;
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

  async getAll(req, res) {
    const userEmail = req.query.email;
    try {
      //Identify the currently logged in user
      const [user] = await this.userModel.findOrCreate({
        where: { email: userEmail },
        defaults: {
          email: userEmail,
        },
      });

      const getAllReservations = await this.model.findAll({
        where: {
          userId: user.id,
        },
        include: this.restaurantModel,
        order: [["updatedAt", "DESC"]],
      });

      return res.json(getAllReservations);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateOne(req, res) {
    const id = req.params.reservationId;
    const { reservationDate, numOfGuests, remarks } = req.body;

    try {
      const updateReservation = await this.model.update(
        {
          reservationDate: reservationDate,
          numOfGuests: numOfGuests,
          remarks: remarks,
        },
        { where: { id: id } }
      );

      return res.json(updateReservation);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteOne(req, res) {
    const id = req.params.reservationId;
    try {
      // Check if the reservation exists
      const existingReservation = await this.model.findByPk(id);
      if (!existingReservation) {
        return res
          .status(404)
          .json({ error: true, msg: "Reservation not found" });
      }

      // Delete the reservation
      await existingReservation.destroy();

      return res.json({
        success: true,
        msg: "Reservation deleted successfully",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ReservationsController;
