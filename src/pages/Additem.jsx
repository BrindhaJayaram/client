import { Fragment, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
export default function AddItem() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: '',
    serialno: '',
    productname: '',
    productcategory: '',
    productprice: '',
    productquantity: '',
    productvalue: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/additem', formData);

      console.log(response.data.message);
      navigate('/');
    
    } catch (error) {
      console.error('Error submitting form:', error.message);
      if (error.response) {
        console.error('Server response:', error.response.data);
        
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Fragment>
      <div className='text-black font-bold text-4xl font-sans text-center'>Add New Product</div>
      <br></br>
      <div className='p-3 max-w-lg mx-auto bg-gray-300 rounded-lg'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <p className='text-black text-lg'>Product Image</p>
          <input type='file' accept='image/*' onChange={handleImageChange} />

          {selectedImage && (
            <div>
              <img
                src={selectedImage}
                alt='Selected'
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            </div>
          )}

          <p className='text-black text-lg'>Serial Number</p>
          <input
            type='number'
            name='serialno'
            placeholder='Serial Number'
            className='border p-2 rounded-lg'
            autoComplete='off'
            onChange={handleInputChange}
            value={formData.serialno}
          />

          <p className='text-black text-lg'>Product Name</p>
          <input
            type='text'
            name='productname'
            placeholder='Product Name'
            className='border p-2 rounded-lg'
            autoComplete='off'
            onChange={handleInputChange}
            value={formData.productname}
          />

          <p className='text-black text-lg'>Product Category</p>
          <input
            type='text'
            name='productcategory'
            placeholder='Product Category'
            className='border p-2 rounded-lg'
            autoComplete='off'
            onChange={handleInputChange}
            value={formData.productcategory}
          />

          <p className='text-black text-lg'>Product Price</p>
          <input
            type='number'
            name='productprice'
            placeholder='Product Price'
            className='border p-2 rounded-lg'
            autoComplete='off'
            onChange={handleInputChange}
            value={formData.productprice}
          />

          <p className='text-black text-lg'>Product Quantity</p>
          <input
            type='number'
            name='productquantity'
            placeholder='Product Quantity'
            className='border p-2 rounded-lg'
            autoComplete='off'
            onChange={handleInputChange}
            value={formData.productquantity}
          />

          <p className='text-black text-lg'>Product Value</p>
          <input
            type='number'
            name='productvalue'
            placeholder='Product Value'
            className='border p-2 rounded-lg'
            autoComplete='off'
            onChange={handleInputChange}
            value={formData.productvalue}
          />

          <button className='bg-red-500 w-24 h-8 mt-6 ml-32 rounded-lg text-white text-lg hover:text-black'>
            Submit
          </button>
          <Link to='/' className='bg-green-500 w-24 h-8 -mt-12 ml-64 rounded-lg text-white text-lg hover:text-black'>
          <button className='ml-8' >
           Back
          </button></Link>
        </form>
      </div>
    </Fragment>
  );
}
