import { Fragment, useEffect, useState } from 'react';
import Storevalue from '../assets/dollar.png';
import Totalproducts from '../assets/shopping-cart.png';
import Outofstock from '../assets/out-of-stock.png';
import Categories from '../assets/category.png';
import { Link } from 'react-router-dom';
import Eye from '../assets/view.png';
import Delete from '../assets/delete.png';
import axios from '../axiosConfig';

export default function AssetItem() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalStoreValue, setTotalStoreValue] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [allCategoriesCount, setAllCategoriesCount] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getitems');
        setItems(response.data);
        updateCounts(response.data); 
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };
    fetchItems();
  }, []);

  const updateCounts = (items) => {
    // Calculate counts based on items array
    const totalProductsCount = items.length;
    const totalValue = items.reduce((total, item) => total + item.productvalue, 0);
    const outOfStockItemsCount = items.filter((item) => item.productquantity === 0).length;
    const uniqueCategoriesCount = new Set(items.map((item) => item.productcategory)).size;
  
    // Update state with the calculated counts
    setTotalProducts(totalProductsCount);
    setTotalStoreValue(totalValue);
    setOutOfStockCount(outOfStockItemsCount);
    setAllCategoriesCount(uniqueCategoriesCount);
  };
  
  const handleDeleteItem = async (itemId) => {
    try {
      console.log(`Delete item with ID: ${itemId}`);
      await axios.delete(`http://localhost:5000/deleteitem/${itemId}`);
      const updatedItems = items.filter((item) => item.serialno !== itemId);
      setItems(updatedItems);
      updateCounts(updatedItems);
  
      
      const response = await axios.get('http://localhost:5000/getitems');
      setItems(response.data);
      updateCounts(response.data);
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };
  const handleViewDetails = (item) => {
    setSelectedItem(item);
  };
  const handleSearch = (event) => {
    const inputText = event.target.value;
    setSearchInput(inputText);

    const filteredItems = items.filter((item) =>
      item.productname.toLowerCase().includes(inputText.toLowerCase())
    );
    updateCounts(filteredItems);
  };

  const rowsToRender = searchInput ? items.filter((item) => item.productname.toLowerCase().includes(searchInput.toLowerCase())) : items;

  return (
    <Fragment>
      <br />
      <div className='text-black font-bold text-4xl font-sans'>AssetItem Status</div>
      <br />
      <div className='flex flex-wrap justify-evenly'>
        <div className='bg-purple-500 w-72 h-28 rounded-3xl'>
          <img src={Totalproducts} alt='Totalproducts' className='w-20 h-20 mt-4' />
          <div className='ml-28 -mt-16'>
            <p className='text-white text-2xl'>Total Products</p>
            <p className='text-white text-2xl ml-16'>{totalProducts}</p>
          </div>
        </div>
        <div className='bg-green-600 w-72 h-28 rounded-3xl'>
          <img src={Storevalue} className='w-20 h-20 mt-4' alt='Storevalue' />
          <div className='ml-24 -mt-16'>
            <p className='text-white text-2xl'>Total Store Value</p>
            <p className='text-white text-2xl ml-16'>{totalStoreValue}</p>
          </div>
        </div>
        <div className='bg-red-600 w-72 h-28 rounded-3xl'>
          <img src={Outofstock} alt='outofstock' className='w-20 h-20 mt-4'></img>
          <div className='ml-28 -mt-16'>
            <p className='text-white text-2xl'>Out of Stock</p>
            <p className='text-white text-2xl ml-16'>{outOfStockCount}</p>
          </div>
        </div>
        <div className='bg-blue-400 w-72 h-28 rounded-3xl'>
          <img src={Categories} alt='categories' className='w-16 h-16 ml-8 mt-6' />
          <div className='ml-28 -mt-16'>
            <p className='text-white text-2xl'>All Categories</p>
            <p className='text-white text-2xl ml-16'>{allCategoriesCount}</p>
          </div>
        </div>
      </div>
      <br />
      <hr className='flex-grow border-t border-green-400' />
      <br />
      <div className='flex flex-wrap'>
        <div className='text-black font-bold text-4xl font-sans'>Asset Items</div>
        <input
          type='text'
          placeholder='Search...'
          className='bg-transparent focus:outline-none border-gray-400 border-2 w-58 h-8 mt-2 ml-12'
          onChange={handleSearch}
        />
        <Link to='/additem'>
          <button
            type='submit'
            className='bg-red-500 w-24 h-8 mt-2 ml-10 rounded-lg text-white text-lg hover: hover:text-black'
          >
            Add
          </button>
        </Link>
      </div>
      <br />
      <div className=''>
        <table className='table-fixed border-separate border border-green-900 bg-green-100'>
          <thead>
            <tr>
              <th className='border border-green-600'>S/N</th>
              <th className='border border-green-600'>Name</th>
              <th className='border border-green-600'>Category</th>
              <th className='border border-green-600'>Price</th>
              <th className='border border-green-600'>Quantity</th>
              <th className='border border-green-600'>Value</th>
              <th className='border border-green-600'>Action</th>
            </tr>
          </thead>
          <tbody>
            {rowsToRender.map((item, index) => (
              <tr key={index}>
                <td className='border border-green-600 '>{index + 1}</td>
                <td className='border border-green-600'>{item.productname}</td>
                <td className='border border-green-600'>{item.productcategory}</td>
                <td className='border border-green-600'>{item.productprice}</td>
                <td className='border border-green-600'>{item.productquantity}</td>
                <td className='border border-green-600'>{item.productvalue}</td>
                <td className='border border-green-600 flex flex-wrap p-2'>
                  <img
                    src={Eye}
                    alt='eyeicon'
                    className='w-6 h-6 ml-4 cursor-pointer'
                    onClick={() => handleViewDetails(item)}
                  />
                  <img
                    src={Delete}
                    alt='deleteicon'
                    className='w-6 h-6 ml-4 cursor-pointer'
                    onClick={() => handleDeleteItem(item.serialno.toString())}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedItem && (
  <div className='fixed top-80 left-1/2 transform -translate-x-1/2 bg-white p-4 shadow-md'>
    <div className='flex items-center mb-4'>
      {selectedItem.image && (
        <img className='w-24 h-24 mr-4' src={selectedItem.image} alt={selectedItem.productname} />
      )}
      <div>
        <p className='text-xl font-bold'>Serial No: {selectedItem.serialno}</p>
        <p className='text-xl font-bold'>Name: {selectedItem.productname}</p>
        <p className='text-xl font-bold'>Category: {selectedItem.productcategory}</p>
        <p className='text-xl font-bold'>Price: {selectedItem.productprice}</p>
        <p className='text-xl font-bold'>Quantity: {selectedItem.productquantity}</p>
        <p className='text-xl font-bold'>Value: {selectedItem.productvalue}</p>
      </div>
    </div>
    <div>
      <Link to={`/update/${selectedItem.serialno}`}>
        <button className='bg-green-500 text-white px-4 py-2 rounded-md'>Edit</button>
      </Link>
    </div>
  </div>
)}

    </Fragment>
  );
}
