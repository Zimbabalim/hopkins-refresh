/* generic caller, handles query after processing and returns error on failure (only 500) */

// TODO
export const deleter = async (req, res, options) => {

  let data = null;

  try {
    data = await options.query.exec();
  } catch (error) {
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

export default deleter;
