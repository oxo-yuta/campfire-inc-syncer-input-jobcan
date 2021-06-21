const JobCanApi = require('./JobCanApi')

async function main(){
  try{
    console.time('main')

    // get requests data
    jcapi = new JobCanApi(process.env.JOB_CAN_API_TOKEN)
    const requests = await jcapi.getRequestList(1)

    // save as csv
    const createCsvWriter = require('csv-writer').createObjectCsvWriter
    const csvWriter = createCsvWriter({
      path: 'data.csv',
      header: ["id","title","form_id","form_name","form_type","settlement_type","status","applied_date","applicant_code","applicant_last_name","applicant_first_name","applicant_group_name","applicant_position_name","proxy_applicant_last_name","proxy_applicant_first_name","group_name","group_code","project_name","project_code","flow_step_name","is_content_changed","total_amount","pay_at","final_approval_period","final_approved_date"]
    })
    await csvWriter.writeRecords(requests)
    console.timeEnd('main')
  }catch(err){
    console.error(err)
  }
}
main()