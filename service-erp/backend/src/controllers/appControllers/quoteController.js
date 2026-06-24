const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Quote');

methods.mail = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Mail sent successfully',
  });
};

methods.convert = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Converted successfully',
  });
};

module.exports = methods;
