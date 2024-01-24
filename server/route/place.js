const {Router} = require('express');
const placeController = require('../controller/place')

const router = Router();

router.post('/add_place', placeController.add_place);
router.get('/get_all_places', placeController.get_all_places);
router.get('/get_place_by_id/:id', placeController.get_place_by_id);
router.post('/update_place/:id', placeController.update_place);
router.delete('/delete_place/:id', placeController.delete_place);

module.exports = router;