import mongoose from 'mongoose';

export const getAllUsers = (req, res) => {
  res.send({
    msg: 'getAllUsers'
  })
}
