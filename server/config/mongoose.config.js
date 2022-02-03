const mongoose = require("mongoose");

const database = 'restaurantKioskdb'

mongoose
  .connect(`mongodb://localhost/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Established a connection to the ${database} database`))
  .catch((error) =>
    console.log(`Something went wrong when connecting to ${database}`, error)
  );
