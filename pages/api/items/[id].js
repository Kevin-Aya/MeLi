import { getItemById } from "../../../meli-api/api";

export default async (req, res) => {
  let data = await getItemById(req.query.id);
  res.status(200).json(data);
};
