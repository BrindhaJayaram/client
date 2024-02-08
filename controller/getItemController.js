import AssetItem from '../models/addItemmodel.js';

const getItemsController = async (req, res) => {
  try {
    const items = await AssetItem.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getItemsController;
