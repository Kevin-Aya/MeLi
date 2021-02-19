import { getItemById } from "../../../meli-api/api";

export default async (req, res) => {
  let data = await getItemById(req.query.id);
  if (data?.error) {
    res.status(data?.status).json(data);
  } else {
    res.status(200).json(data);
  }
};
