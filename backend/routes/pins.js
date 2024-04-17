const express = require('express');
const pinsRoutes = express.Router();
const Pin = require('../models/Pin.ts');
const { requireAuth } = require('../middleware/authMiddleware.js');

//create pin
pinsRoutes.post('/create',(req, res)=>{
   const newPin= new Pin(req.body);
   newPin.save()
   .then((data)=>{ 
    res.status(200).send(data)
}).catch((err)=>{
    res.status(500).json(err);
})
}) 
// Delete pin
pinsRoutes.delete('/delete_pin/:pinId', async (req, res) => {
  try {
      const pinId = req.params.pinId;
      const deletedPin = await Pin.findByIdAndDelete(pinId);
      if (!deletedPin) {
          return res.status(404).json({ message: req.t('Pin not found') });
      }
      res.status(200).json({ message: req.t('pin_deleted_successfully'), deletedPin });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

//get all pins

pinsRoutes.get('/get_pins',(req, res)=>{
   Pin.find()
    .then((data)=>{ 
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).json({ error: req.t('Failed to retrieve pins') ,err});
    })
})
// API endpoint to get the number of pins for each user
pinsRoutes.get('/pins_per_user',requireAuth, async (req, res) => {
  try {
    const pinsPerUser = await Pin.aggregate([
        {
          $group: {
            _id: '$username', 
            pinsCount: { $sum: 1 }
          }
        },
        {
          $sort: { pinsCount: -1 }
        }
      ]);
      res.status(200).json({pinsPerUser, isLoggedIn:res.loggedIn});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = pinsRoutes;