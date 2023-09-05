class ReservationsRouter {
  constructor(express, controller, checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes() {
    const router = this.express.Router();

    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:reservationId", this.controller.getOne.bind(this.controller));
    router.post("/:restaurantId", this.checkJwt, this.controller.insertOne.bind(this.controller));
    return router;
  }
}

module.exports = ReservationsRouter;
