import Product from "../models/product.model.js";

//@desc   Fetch all products 
//@route  GET /api/products
//@access Public

const getProducts = async (req, res) => {

    const pageSize = process.env.PAGINATION_LIMIT || 5;

    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

    res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })

}



//@desc    Fetch single product
//@route   GET /api/products/:id
//@access Public

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.status(200).json(product);
    } else {
        res.status(404);
        throw new Error('Product not found')
    }
}





















//@desc   Create a product
//@route  POST /api/products
//@access Private/Admin

const createProduct = async (req, res, next) => {
    const { image, brand, category, description, rating, numReviews, countInStock } = req.body;
    const user = req.user._id;
    const name = req.user.name;
    const product = new Product({
        user,
        name,
        image,
        brand,
        category,
        description,
        rating,
        numReviews,
        countInStock,

    })

    try {
        const createdProduct = await product.save();
        if (createProduct) {

            res.status(201).json(createdProduct)
        }
    } catch (error) {
        res.status(404);
        next(new Error(error))
    }

}



//@desc   Update a product
//@route  PUT /api/products/:id
//access  Private/Admin

const updateProduct = async (req, res, next) => {

    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;


        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);

    } else {
        res.status(404);
        next(new Error("Product not found"))
    }

}


//@desc   Delete a product 
//@route  DELETE /api/products/:id
//@access Private/Admin

const deleteProduct = async (req, res, next) => {
    const product = await Product({ _id: req.params.id });


    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: 'Product deleted' });
    }
    else {
        res.status(404);
        next(new Error("Product not found"))
    }
}



//@desc   Create new review
//@route  POST /api/products/:id/reviews
//@access Private

const createProductReview = async (req, res, next) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);


    if (product) {

        const alreadyReviewed = product.review.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {

            res.status(400).json({ message: "Product already reviewed" });

        }
        else {
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            product.review.push(review)

            product.numReviews = product.review.length;

            product.rating =
                product.review.reduce((acc, item) => item.rating + acc, 0) / product.review.length;


            await product.save();
            res.status(201).json({ message: 'Review added' });

        }





    } else {
        res.status(404);
        throw new Error('Product not found')
    }

}


//@desc   Get top rated products
//@routes Get /api/products/top
//@access Public

const getTopProducts = async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    res.status(200).json(products)
}


export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts }