SELECT id, name, price, category
FROM products
WHERE price BETWEEN 50 AND 200
ORDER BY price ASC
LIMIT 10 OFFSET 10 * ($1 - 1); // $1 is the page number

//Optimization 

// 1- indexing
CREATE INDEX idx_price ON products(price);

CREATE INDEX idx_category_price ON products(category, price);





