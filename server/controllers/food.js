const FoodItems = require('../models/Food');

   exports.createFooditems = async (req, res) => {
       console.log(req.body)
       const {name, price, description,} = req.body;
        try{
            const food = await FoodItems.create({
                name,
                price,
                description,
        })
        res.status(200).json({food});
  } catch (err) {
    console.log(err);
    next(err);
  }
};

        module.exports.getFooditems = async (req, res) => {
            // console.log(req.food.id)
            try{    
                const food = await FoodItems.find({
                    
                })
                res.send(food);
                console.log(food[0].id)
               
    } catch (error) {
        res.send(error);
    }
};
          module.exports.getFooditem = (req, res) => {
              console.log(req.params.id)
  FoodItems.findOne({ _id: req.params.id })
    .then((food) => res.json(food))
    .catch((err) => res.json(err));
};
        
                exports.updateFooditem = async (req, res) => {
                   try {
    const food = await FoodItems.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    res.send(food);
  } catch (error) {
    res.send(error);
  }
};
                exports.deleteFooditem = async (req, res) => {
                  console.log(req)
                  console.log(req.params.id)
                   try {
    const food = await FoodItems.findByIdAndDelete(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    res.send(food, 'purchased');
  } catch (error) {
    res.send(error);
  }
};

