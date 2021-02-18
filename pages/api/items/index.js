import { getItems } from "../../../meli-api/api";

export default async (req, res) => {
  let data = await getItems(req.query.search);
  res.status(200).json(data);
};
