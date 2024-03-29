/* generic caller, handles query after processing and returns error on failure (only 500) */

export const finder = async (req, res, options) => {

  let data = null;

  try {
    data = await options.query.exec();
  } catch (error) {
    console.error('!../finder/ -finder ERROR', error);
    res.status(500).send({
      message: options.error || 'Borked!',
      success: false
    });
    return {
      success: false
    }
  }
  return {
    data,
    success: true
  };
}

export default finder;
