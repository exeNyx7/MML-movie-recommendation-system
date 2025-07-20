const News = require('../models/News');

// Create a new article
exports.createArticle = async (req, res) => {
    try {
        const article = new News(req.body);
        await article.save();
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all articles with filtering and pagination
exports.getArticles = async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    try {
        const query = category ? { category } : {};
        const articles = await News.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ publicationDate: -1 });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific article by ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await News.findById(req.params.id).populate('associatedMovies');
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an article
exports.updateArticle = async (req, res) => {
    try {
        const article = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
    try {
        const article = await News.findByIdAndDelete(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
