import addItemmodel  from '../models/addItemmodel.js';
const handleDeleteItem = async (req, res, next) => {
    try {
      const itemId = req.params.serialno;
  
      console.log(`Delete item with ID: ${itemId}`);
  
      const deletedItem = await addItemmodel.findByIdAndDelete(itemId);
  
      if (!deletedItem) {
        console.error(`Item with ID ${itemId} not found`);
        return res.status(404).json({ error: 'Item not found' });
      }
  
   
      console.log(`Item with ID ${itemId} deleted successfully`);
      res.status(200).json({ message: 'Item deleted successfully' });
  
   
    } catch (error) {
      console.error('Error deleting item:', error.message);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };
  export default handleDeleteItem;