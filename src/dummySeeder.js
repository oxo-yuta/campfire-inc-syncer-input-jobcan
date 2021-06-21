const JobCanPuppeteer = require('./JobCanPuppeteer')
const _ = require('lodash');
const Aigle = require('aigle');
Aigle.mixin(_);

async function main(){
  const jobcanPuppeteer = new JobCanPuppeteer()
  await jobcanPuppeteer.init()
  const numberArray = _.times(800, String)
  for(let i of numberArray) {
      await jobcanPuppeteer.addRequest(i)
      console.log(i)
  }
}
console.time('main')
main()
console.timeEnd('main')