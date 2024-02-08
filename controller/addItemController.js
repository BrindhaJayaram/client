// additem.controller.js

import AssetItem  from '../models/addItemmodel.js';

const assetItemController = async (req, res) => {
  try {
    const { image, serialno, productname, productcategory, productprice, productquantity, productvalue } = req.body;

    if (!image || !serialno || !productname || !productcategory || !productprice || !productquantity || !productvalue) {
      return res.status(422).json({ error: 'All fields are required', details: 'Invalid input data' });
    }

    const newProduct = new AssetItem({
      image,
      serialno,
      productname,
      productcategory,
      productprice,
      productquantity,
      productvalue,
    });

    try {
      await newProduct.save();
      res.status(201).json({ message: 'Product registered successfully' });
    } catch (error) {
      console.error(error);

      if (error.code === 11000) {
        console.error('Duplicate serial number:', error.keyValue.serialno);
        res.status(422).json({ error: 'Duplicate serial number' });
      } else if (error.name === 'ValidationError') {
        console.error('Validation error:', error.message);
        res.status(422).json({ error: 'Validation error', details: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default assetItemController;
