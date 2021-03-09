import axios from "axios";

export default (req, res) => {
  const stringVers = JSON.stringify(req.body);
  console.log(stringVers);
  res.status(200).json({ message: stringVers });
};
