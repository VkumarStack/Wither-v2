const Mongoose = require('mongoose');
const conn = Mongoose.connection;
const TRANSACTION_RETRIES = 5;

// Wrapper for transactional requests - f should be a function that takes req, res, and a session
exports.handleTransaction = async(f, req, res) => {
  const session = await conn.startSession();
  let success = false;
  let currentTry = 0;
  while (!success && currentTry < TRANSACTION_RETRIES) {
    try {
      session.startTransaction();
      await f(req, res, session);
      await session.commitTransaction();
      success = true;
    } catch(e) {
      if (e.codeName == "WriteConflict") {
        await session.abortTransaction();
        currentTry++;
      } else {
        break;
      }
    }

  }
  await session.endSession();
  return success;
}