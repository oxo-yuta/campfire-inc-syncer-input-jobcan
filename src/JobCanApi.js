require('dotenv').config()
const axiosBase = require('axios');

class JobCanApi {
  axios
  axiosOption

  requestCount

  constructor(token){
    this.axios = axiosBase.create({
      baseURL: 'https://ssl.wf.jobcan.jp/wf_api/',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Token ${token}`,
      },
      responseType: 'json',
      timeout: 20000
    })
  }

  async getRequestList(page){
    return new Promise( async (resolve, reject) => {
      try{
        // set 1 for page if not provided
        if(!page){
          page = 1
        }
        console.log(`working on page ${page}`)
        const option = {
          params: {
            page: page,
            sort_by: 'applied_date_asc'
          }
        }
        // get requests
        const response = await this.axios('/v2/requests', option)
        let resultArray = response.data.results
        if(page == 1){
          // save requests count
          this.requestCount = response.data.count
          console.log(`there are ${this.requestCount} request(s)`)
        }
        if(response.data.next){
          // if there are next page, run self recursively
          resultArray = resultArray.concat( await this.getRequestList( page+1 ) )
        }
        if(page == 1){
          console.log(`Got ${resultArray.length} request(s)`)
          if(resultArray.length != this.requestCount){
            console.log('request count is NOT valid')
          }else{
            console.log('request count is valid')
          }
        }
        resolve( resultArray )
      }catch(err){
        reject(err)
      }
    })
  }
}
module.exports = JobCanApi