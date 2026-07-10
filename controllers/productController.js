const db = require("../config/db");

const addProduct = (req, res) => {

    const {
        name,
        description,
        price,
        stock
    } = req.body;

    const sql =
    `INSERT INTO products
    (name, description, price, stock)
    VALUES (?, ?, ?, ?)`;

    db.query(
        sql,
        [name, description, price, stock],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message:
                "Product Added Successfully"
            });

        }
    );

};

const getProducts = (req, res) => {

    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result);

    });
};

const getProductById = (req, res) => {

    const productId = req.params.id;

    const sql = "SELECT * FROM products WHERE id = ?";

    db.query(sql, [productId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(result[0]);
    });
};

module.exports = {
    addProduct,
    getProducts,
    getProductById
};