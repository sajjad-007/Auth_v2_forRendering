const cron = require('node-cron');
const { User } = require('../model/userSchema');

const removeUnverifiedUser = () => {
  cron.schedule('*/30 * * * *', async () => {
    const presentTimeMinusThirtyMin = new Date(Date.now() - 30 * 60 * 1000);
    await User.deleteMany({
      accountVerified: false,
      //$lt = less than , $gt = greater than
      createdAt: { $lt: presentTimeMinusThirtyMin },
    });
  });
};

module.exports = { removeUnverifiedUser };
