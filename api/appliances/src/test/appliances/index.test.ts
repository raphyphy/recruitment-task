import 'mocha';
import { agent as request } from 'supertest';
import { createToken } from '../../utils';
import app from '../../app';
import db from '../../db';
import { expect } from 'chai';

describe('Appliances', () => {
  describe('GET /appliances', () => {
    it('should get all appliances', async () => {
      const res = await request(app).get('/appliances')
      expect(res.status).to.equal(200)
      expect(res.body.appliances.length).to.equal(db.size)
    })
  })

  describe('POST /appliances', () => {
    const validUser = {
      id: 'abc123',
      email: 'test@vocovo.com',
    }
    const validAppliance = {
      id: 343,
      name: "Appliance x31",
      type: "User device"
    }
    const validUserToken = createToken(validUser)
    beforeEach(() => {
      // do this before each test under this describe
    })
    it('should report unauthorized request', async () => {
      const res = await request(app).post('/appliances')
      expect(res.status).to.equal(401)
      expect(res.body.errorType).to.equal('Unauthorized')
    });

    it('should add an appliance to the database', async () => {
      const res = await request(app)
        .post('/appliances')
        .set('Authorization', validUserToken)
        .send(validAppliance)
      expect(res.status).to.equal(200)

      const applianceObj = res.body.applianceObj
      expect(res.body.inserted).to.equal(1)
      expect(applianceObj.id).to.equal(validAppliance.id)
      expect(applianceObj.name).to.equal(validAppliance.name)
      expect(applianceObj.type).to.equal(validAppliance.type)
      expect(applianceObj.createdAt).to.be.a('string')
    });
  })
})