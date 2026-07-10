const db = require("../config/db");

const placeOrder = (req, res) => {

    const userId = 1;

    const totalSql = `
        SELECT
            SUM(products.price * cart.quantity)
            AS total
        FROM cart
        JOIN products
        ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    db.query(totalSql, [userId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        const total = result[0].total;

        if (!total) {
         return res.status(400).json({
        message: "Cart is empty. Please add products before placing an order."
        });
       }

        const orderSql =
            "INSERT INTO orders(user_id, total_amount) VALUES (?, ?)";

        db.query(
            orderSql,
            [userId, total],
            (err, orderResult) => {

                if (err) {
                    return res.status(500).json(err);
                }

                const clearCartSql =
                    "DELETE FROM cart WHERE user_id = ?";

                db.query(
                    clearCartSql,
                    [userId],
                    (err) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.json({
                            message: "Order Placed Successfully"
                        });

                    }
                );
            }
        );
    });
};

const getOrders = (req, res) => {

    const userId = 1;

    const sql = `
        SELECT *
        FROM orders
        WHERE user_id = ?
        ORDER BY order_date DESC
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

module.exports = {
    placeOrder,
    getOrders
};