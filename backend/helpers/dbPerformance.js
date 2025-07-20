const mongoose = require('mongoose');

/**
 * Database Performance Monitoring Helper
 * Provides utilities for monitoring and optimizing database performance
 */

class DatabasePerformance {
    /**
     * Get database statistics
     * @returns {Promise<Object>} Database stats
     */
    static async getDatabaseStats() {
        try {
            const db = mongoose.connection.db;
            const stats = await db.stats();
            return {
                collections: stats.collections,
                dataSize: stats.dataSize,
                storageSize: stats.storageSize,
                indexes: stats.indexes,
                indexSize: stats.indexSize,
                avgObjSize: stats.avgObjSize,
                objects: stats.objects
            };
        } catch (error) {
            console.error('Error getting database stats:', error);
            return null;
        }
    }

    /**
     * Get collection statistics
     * @param {string} collectionName - Name of the collection
     * @returns {Promise<Object>} Collection stats
     */
    static async getCollectionStats(collectionName) {
        try {
            const db = mongoose.connection.db;
            const stats = await db.collection(collectionName).stats();
            return {
                count: stats.count,
                size: stats.size,
                avgObjSize: stats.avgObjSize,
                storageSize: stats.storageSize,
                indexes: stats.nindexes,
                totalIndexSize: stats.totalIndexSize
            };
        } catch (error) {
            console.error(`Error getting collection stats for ${collectionName}:`, error);
            return null;
        }
    }

    /**
     * Get index information for a collection
     * @param {string} collectionName - Name of the collection
     * @returns {Promise<Array>} Index information
     */
    static async getIndexInfo(collectionName) {
        try {
            const db = mongoose.connection.db;
            const indexes = await db.collection(collectionName).indexes();
            return indexes.map(index => ({
                name: index.name,
                key: index.key,
                unique: index.unique || false,
                sparse: index.sparse || false,
                background: index.background || false
            }));
        } catch (error) {
            console.error(`Error getting index info for ${collectionName}:`, error);
            return [];
        }
    }

    /**
     * Analyze query performance using explain
     * @param {Object} query - Mongoose query object
     * @returns {Promise<Object>} Query execution plan
     */
    static async analyzeQuery(query) {
        try {
            const explain = await query.explain('executionStats');
            return {
                executionTimeMillis: explain.executionStats.executionTimeMillis,
                totalDocsExamined: explain.executionStats.totalDocsExamined,
                totalKeysExamined: explain.executionStats.totalKeysExamined,
                nReturned: explain.executionStats.nReturned,
                indexUsed: explain.queryPlanner.winningPlan.inputStage?.indexName || 'No index used'
            };
        } catch (error) {
            console.error('Error analyzing query:', error);
            return null;
        }
    }

    /**
     * Get slow query logs (if enabled)
     * @returns {Promise<Array>} Slow query logs
     */
    static async getSlowQueries() {
        try {
            const db = mongoose.connection.db;
            const slowQueries = await db.collection('system.profile').find({}).limit(10).toArray();
            return slowQueries.map(query => ({
                op: query.op,
                ns: query.ns,
                millis: query.millis,
                ts: query.ts,
                client: query.client
            }));
        } catch (error) {
            console.error('Error getting slow queries:', error);
            return [];
        }
    }

    /**
     * Check if indexes are being used effectively
     * @param {string} collectionName - Name of the collection
     * @returns {Promise<Object>} Index usage statistics
     */
    static async getIndexUsage(collectionName) {
        try {
            const db = mongoose.connection.db;
            const stats = await db.collection(collectionName).aggregate([
                { $indexStats: {} }
            ]).toArray();

            return stats.map(stat => ({
                name: stat.name,
                accesses: stat.accesses,
                hits: stat.accesses.ops,
                misses: stat.accesses.misses,
                hitRatio: stat.accesses.ops / (stat.accesses.ops + stat.accesses.misses)
            }));
        } catch (error) {
            console.error(`Error getting index usage for ${collectionName}:`, error);
            return [];
        }
    }
}

module.exports = DatabasePerformance; 