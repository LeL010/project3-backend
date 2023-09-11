class ReservationsRouter {
  constructor(express, controller, checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes() {
    const router = this.express.Router();
    router.get(
      "/",
      this.checkJwt,
      this.controller.getAll.bind(this.controller)
    );
    router.get(
      "/:reservationId",
      this.checkJwt,
      this.controller.getOne.bind(this.controller)
    );
    router.post(
      "/:restaurantId",
      this.checkJwt,
      this.controller.insertOne.bind(this.controller)
    );
    router.put(
      "/:reservationId",
      this.checkJwt,
      this.controller.updateOne.bind(this.controller)
    );
    router.delete(
      "/:reservationId",
      this.checkJwt,
      this.controller.deleteOne.bind(this.controller)
    );
    return router;
  }
}

module.exports = ReservationsRouter;
