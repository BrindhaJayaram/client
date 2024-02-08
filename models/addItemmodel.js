import mongoose from 'mongoose';

const { Schema } = mongoose;

const assetItemSchema = new Schema(
    {
        image: {
            type: String,
        },
        serialno: {
            type: Number,
            required: true,
            unique: true,
        },
        productname: {
            type: String,
            required: true,
        },
        productcategory: {
            type: String,
            required: true,
        },
        productprice: {
            type: Number,
            required: true,
        },
        productquantity: {
            type: Number,
            required: true,
        },
        productvalue: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

assetItemSchema.index({ serialno: 1 }, { unique: true });

// Define the model
const AssetItemModel = mongoose.model('AssetItem', assetItemSchema);

// Export the model
export default AssetItemModel;
