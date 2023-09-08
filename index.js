const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/models/index");
const { user, reservation, restaurant } = db;

const UsersRouter = require("./routers/userRouter");
const UsersController = require("./controllers/userController");
const ReservationsRouter = require("./routers/reservationRouter");
const ReservationsController = require("./controllers/reservationController");
const RestaurantsRouter = require("./routers/restaurantRouter");
const RestaurantsController = require("./controllers/restaurantController");

const PORT = process.env.PORT || 3000;
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "https://bookit/api",
  issuerBaseURL: "https://dev-4rxclp7pj6nst5op.us.auth0.com/",
});

const usersController = new UsersController(user);
const usersRouter = new UsersRouter(
  express,
  usersController,
  checkJwt
).routes();

const reservationsController = new ReservationsController(reservation, user, restaurant);
const reservationsRouter = new ReservationsRouter(
  express,
  reservationsController,
  checkJwt
).routes();

const restaurantsController = new RestaurantsController(restaurant);
const restaurantsRouter = new RestaurantsRouter(
  express,
  restaurantsController,
  checkJwt
).routes();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/reservations", reservationsRouter);
app.use("/restaurants", restaurantsRouter);

app.listen(PORT, () => {
  console.log("Application listening to port 3000");
});
