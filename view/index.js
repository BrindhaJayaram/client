import express from 'express';
import multer from 'multer';
import addItemController from '../controller/addItemController.js';
import getItemsController from '../controller/getItemController.js';
import addItemmodel from '../models/addItemmodel.js'
const router = express.Router();



const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 },
});


router.post('/additem', async (req, res, next) => {
  try {
    await addItemController(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/getitems', async (req, res, next) => {
  try {
    await getItemsController(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/getitems/:serialno', async (req, res, next) => {
  try {
    console.log('Handling GET request for /getitems/:serialno');

    const serialno = req.params.serialno;
    console.log('Serial number:', serialno);

  

    console.log('Response sent successfully.');
    res.json({ serialno, data: serialno });
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
});
router.put('/updateitem/:serialno', async (req, res, next) => {
    try {
      const serialno = req.params.serialno;
      const updateData = req.body;
  
     
      console.log('Received data:', updateData);
  
      const updatedItem = await addItemmodel.findOneAndUpdate(
        { serialno: serialno },
        updateData,
        { new: true }
      );
  
      if (!updatedItem) {
        console.error('Item not found for serialno:', serialno);
        return res.status(404).json({ error: 'Item not found' });
      }
  
      console.log('Item updated successfully.');
      res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
      console.error('Error updating item:', error);
  
      console.error(error);
  
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
  router.delete('/deleteitem/:serialno', async (req, res, next) => {
    try {
      const serialno = req.params.serialno;
      const deletedItem = await addItemmodel.findOneAndDelete({ serialno });
  
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      console.log('Item deleted successfully.');
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
  
router.use((err, req, res, next) => {
  console.error('Error in addItemRoute:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

export default router;
