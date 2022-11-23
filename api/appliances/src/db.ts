import crypto from 'crypto'
import { randomDate } from './utils';
import { Appliance } from './types/Appliance';
import sortArray from 'sort-array'

class ApplianceDb {
  private types = ['Set top box', 'Lightbulb', 'Smoke detector']
  private appliances: Appliance[];
  private len = 100

  constructor() {
    this.appliances = []
    for (let i = 0; i < this.len; i++) {
      this.appliances.push({
        id: i,
        name: `Appliance ${crypto.randomBytes(2).toString('hex')}`,
        type: this.types[Math.floor(Math.random() * this.types.length)],
        createdAt: randomDate(new Date(2022, 0, 1), new Date(2022, 0, 30))
      })
    }
  }

  all(by: string = 'id', order: string = 'asc') {
    return sortArray(this.appliances, { by, order })
  }

  add(applianceObj : Appliance | any) {
    this.appliances.push(applianceObj)
    return {
      applianceObj,
      inserted: 1
    }
  }

  upsert(id: number, updateObj: Appliance | any) {
    const index : number  = this.appliances.findIndex(applianceObj => applianceObj.id == id)
    //  let newObj = {...updateObj, ...this.appliances[index]}
    updateObj['id'] = id
    if(index !== -1) {    
      updateObj['createdAt'] = this.appliances[index].createdAt
      updateObj['modifiedAt'] = randomDate(new Date(2022, 0, 1), new Date(2022, 0, 30))
      this.appliances[index] = updateObj
      return {
        updateObj,
        updated: 1
      }
    } else {
      updateObj['createdAt'] = randomDate(new Date(2022, 0, 1), new Date(2022, 0, 30))
      return this.add(updateObj)
    }
  }

  remove(id: number) {
    const oldLen = this.appliances.length
    this.appliances = this.appliances.filter(applianceObj => applianceObj.id != id) // This is a shallow copy

    return {
      removed: oldLen - this.appliances.length
    }
  }

  get size() {
    return this.len
  }
}

export default new ApplianceDb()