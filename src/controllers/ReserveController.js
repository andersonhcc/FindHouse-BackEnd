import Reserve from "../models/Reserve";
import House from "../models/House";
import User from "../models/User";

class ReserveController {
  
  async store(req, res) {  
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = await House.findById(house_id);
    
    if (!house) { 
      return res.status(400).json({ message: "House not found" });
    }

    if(house.status !== true){
      return res.status(400).json({ message: "Solicitacion invalid" });
    }

    const user = await User.findById(user_id);
    if(String(user._id) === String(house.id)){
      return res.status(401).json({ message: "Permissions invalid" });

    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date,
    });

    Reserve.findById({ _id: reserve._id })
    .populate("house")
    .populate("user")
    .exec(function (err, reserve) {
      return res.json(reserve);
    });
  }
}

export default new ReserveController();
