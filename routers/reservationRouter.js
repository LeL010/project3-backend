class ReservationsRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
  }

  routes() {
    const router = this.express.Router();

    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:reservationId", this.controller.getOne.bind(this.controller));
    router.post("/:restaurantId", this.controller.insertOne.bind(this.controller));
    return router;
  }
}

module.exports = ReservationsRouter;
