import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams ,Link} from 'react-router-dom';

export default function Edit() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const { serialno } = useParams();
  const [formData, setFormData] = useState({
    image: '',
    serialno: '',
    productname: '',
    productcategory: '',
    productprice: '',
    productquantity: '',
    productvalue: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/getitems/${serialno}`)
      .then(res => {
        const { image, serialno, productname, productcategory, productprice, productquantity, productvalue } = res.data;
        setFormData({
          image,
          serialno,
          productname,
          productcategory,
          productprice,
          productquantity,
          productvalue,
        });
      })
      .catch(err => console.log(err));
  }, [serialno]);

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSerialNoChange = (e) => {
    const inputSerialNo = e.target.value.trim();
    const serialNo = inputSerialNo === '' ? null : parseInt(inputSerialNo, 10);
    setFormData((prevFormData) => ({
      ...prevFormData,
      serialno: serialNo !== null ? serialNo : '',
    }));
  };


  const handleEdit = (e) => {
    e.preventDefault(); 
    const { serialno, productname, productcategory, productprice, productquantity, productvalue } = formData;

    if (!serialno) {
      console.error('No serialno provided for update.');
      return;
    }

    const updatedData = {
      productname,
      productcategory,
      productprice,
      productquantity,
      productvalue,
    };

    axios.put(`http://localhost:5000/updateitem/${serialno}`, updatedData)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.error('Error updating item:', err.message);
      });
  };
  return (
    <Fragment>
    <div className='text-black font-bold text-4xl font-sans'>Add New Product</div>
    <div className='p-3 max-w-lg mx-auto bg-gray-300 rounded-lg'>
      <form className='flex flex-col gap-4' onSubmit={handleEdit}>
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
          onChange={handleSerialNoChange}
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
          Update
        </button>
        <Link to='/' className='bg-green-500 w-24 h-8 -mt-12 ml-64 rounded-lg text-white text-lg hover:text-black'>
          <button className='ml-8' >
           Back
          </button></Link>
      </form>
    </div>
  </Fragment>
  )
}
