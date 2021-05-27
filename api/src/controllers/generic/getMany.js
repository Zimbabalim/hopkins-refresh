
export const getMany = async (req, res, options) => {

  let data = null;

  try {
    data = await options.query.exec();
  } catch (error) {
    console.error('/getMany/ -getMany', error);
    res.status(500).send({
      message: options.error || 'Borked on the inside',
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

export default getMany;
