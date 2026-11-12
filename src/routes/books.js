const express = require("express");
const db = require("../db/db");
const { books } = require("../db/schema");
const router = express.Router();
const renderErrorHandler = require("../utilities/renderErrorHandler");
const { eq } = require("drizzle-orm");

router.get("/", async (req, res) => {

    try {
        const entires = await db.select().from(books);
        return res.status(200).json(entires);
    } catch (err) {
        return renderErrorHandler(res, err);
    }


});


router.get("/:id", async (req, res) => {
    try {
        const [entry] = await db.select().from(books).where(eq(books.id, req.params.id));

        if (!entry) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(entry);
    }
    catch (err) {
        return renderErrorHandler(res, err);
    }
});


router.post("/", async (req, res) => {
    try {
        const { title, author, year } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        if (!author) {
            return res.status(400).json({ message: "Author is required" });
        }
        if (year === undefined || year > new Date().getFullYear()) {
            return res.status(400).json({ message: "Year is required" });
        }

        await db.insert(books).values({ 
            title: title,
             author: author,
              year: year 
            });
        return res.status(201).json({ message: "Book created successfully" });



    } catch (err) {
        return renderErrorHandler(res, err);
    }
});

module.exports = router;