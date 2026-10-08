const mongoose = require('mongoose');
const dns = require('dns');

// Configure public reliable DNS servers to resolve MongoDB Atlas SRV records
// (Prevents querySrv ECONNREFUSED issues with restrictive local ISP / router DNS)
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
    // Ignore if not supported in custom environment
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn && mongoose.connection.readyState >= 1) {
        return cached.conn;
    }

    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
        console.error('❌ MONGODB_URI is not defined in environment variables.');
        throw new Error('MONGODB_URI environment variable is required in Vercel settings');
    }

    if (!cached.promise) {
        const opts = {
            serverSelectionTimeoutMS: 10000,
            maxPoolSize: 10,
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose.connect(mongoUri, opts).then((mongooseInstance) => {
            console.log(`✅ Database connected successfully: ${mongooseInstance.connection.host}`);
            return mongooseInstance;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.error('❌ Database connection failed:', error.message);
        throw error;
    }

    return cached.conn;
};

module.exports = connectDB;
