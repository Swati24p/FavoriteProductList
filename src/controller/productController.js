const productModel = require("../Models/productModel");
const validator = require('../middleware/validation');
const userModel = require("../Models/userModel.js")


//--------------------------------------------------------add Product---------------------------------------------------------------------------//

const createProduct = async function (req, res) {
    try {
        let userId = req.params.userId;
        console.log(userId)
        let { title, description, price, isFavorite } = req.body;

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "Plz Enter Data Inside Body !!!" });
        }
        // userId validation
        if (!validator.isValid(userId)) {
            return res.status(400).send({ status: false, message: "userId is required" })
        }
        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "plz enter valid userId" })
        }

        if (!title) {
            return res.status(400).send({ status: false, msg: "Plz Enter title In Body !!!" });
        }

        if (!validator.isValidName(title)) {
            return res.status(400).send({ status: false, msg: "Please mention valid title In Body !!!" });
        }

        const findTitle = await productModel.findOne({ title: title });
        if (findTitle) {
            return res.status(409).send({ status: false, msg: "Title Is Already Exists, Plz Enter Another One!!!" });
        }

        if (!description) {
            return res.status(400).send({ status: false, msg: "Plz Enter description In Body !!!" });
        }

        if (!price) {
            return res.status(400).send({ status: false, msg: "Plz Enter price In Body !!!" });
        }
        if (!validator.isValidPrice(price)) {
            return res.status(400).send({ status: false, msg: "Plz Enter valid format price In Body !!!" });
        }

        let productData = { title, description, price, isFavorite, userId };
        const savedData = await productModel.create(productData);
        res.status(201).send({ status: true, message: 'Success', product: savedData });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};



// * A route to show list of product with pagination. Product should have an option to make item as favourite.-------------------------------------

const getAllProduct = async (req, res) => {

    try {
        const data = req.query
        const {page = 1, limit = 5} = data;

        const product = await productModel.find({ $and: [data, { isDeleted: false }] })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .select({ _id: 1, title: 1, discription: 1, userId: 1, price: 1, isFavorite: 1 })
        .sort({ 'title': 1 })

        if (product.length == 0)
            return res.status(404).send({ status: false, msg: "No products Available." })
        return res.status(200).send({ status: true, count: product.length, msg: 'product list', data: product });
    }

    catch (error) {
        res.status(500).send({ status: 'error', Error: error.message })
    }
}



//* A route to show list of favourite products. Favourite product should have a button to remove product from favourite list----------------------------------

const getFavProduct = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (userId.length < 24 || userId.length > 24) {
            return res.status(400).send({ status: false, msg: "Plz Enter Valid Length Of userId in Params !!!" });
        }

        let data = req.query;

        if (data) {
            let query = { _id:userId, isFavorite: true, isDeleted: false }

            let getAllProduct = await productModel.find(query).sort({ price: 1})

            if (!(getAllProduct.length > 0)) {
                return res.status(404).send({ status: false, message: "Products Not Found" })
            }

            return res.status(200).send({ status: true, count: getAllProduct.length, message: "Success", favoriteProduct: getAllProduct })
        }
        else {
            return res.status(400).send({ status: false, message: "Invalid Request Query Params" })
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })

    }
};

module.exports = { createProduct, getAllProduct, getFavProduct }