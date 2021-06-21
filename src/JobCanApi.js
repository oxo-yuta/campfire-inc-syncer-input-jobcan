require('dotenv').config()
const axiosBase = require('axios');

class JobCanApi {
  axios
  axiosOption

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
          console.log(page)
          if(!page){
            page = 1
          }
          const option = {
            params: {
              page: page,
              sort_by: 'applied_date_asc'
            }
          }
          let resultArray = []
          const response = await this.axios('/v2/requests', option)
          console.log(response.data.results[0])
          resultArray = response.data.results
          console.log(page)
          if(response.data.next){
            resultArray = resultArray.concat( await this.getRequestList( page+1 ) )
          }
          resolve( resultArray )
      }catch(err){
        reject(err)
      }
    })
  }
}
module.exports = JobCanApi