const db = require("../config/db");

const addToCart = (req, res) => {

    const { user_id, product_id, quantity } = req.body;

    const sql =
        "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";

    db.query(
        sql,
        [user_id, product_id, quantity],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Product added to cart"
            });

        }
    );
};
const getCart = (req, res) => {

    const sql = `
        SELECT
            cart.id,
            products.name,
            products.price,
            cart.quantity
        FROM cart
        JOIN products
        ON cart.product_id = products.id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });
};
const removeFromCart = (req, res) => {

    const cartId = req.params.id;

    const sql =
        "DELETE FROM cart WHERE id = ?";

    db.query(
        sql,
        [cartId],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Item removed from cart"
            });

        }
    );
};
const updateQuantity = (req, res) => {

    const cartId = req.params.id;

    const { quantity } = req.body;

    const sql =
        "UPDATE cart SET quantity = ? WHERE id = ?";

    db.query(
        sql,
        [quantity, cartId],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Quantity updated successfully"
            });

        }
    );
};
module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateQuantity
};