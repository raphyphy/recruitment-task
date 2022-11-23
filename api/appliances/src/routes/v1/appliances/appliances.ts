import express from 'express'
import { list, add, update, remove } from '../../../controllers/appliances'
import { checkJwt } from '../../../middleware/checkJwt'

const router = express.Router()

router.get('/', list)
router.post('/', [checkJwt], add)
router.put('/:applianceId', [checkJwt], update)
router.delete('/:applianceId', [checkJwt], remove)

// This API will contain action/s that you can perform with an appliance. Depending on the requirement, they can be aggregated into one API or be separated (e.g. appliances/id/reboot, appliances/id/shutdown, etc.) or if the object is just going to be modified based on a field/s, PUT /appliances/id can be reused by the consuming service since it is field agnostic.
// router.put('/:applianceId/operate?action=reboot')  

export default router
