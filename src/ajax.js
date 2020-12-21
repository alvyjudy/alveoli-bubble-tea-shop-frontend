import axios from "axios";

const ajax = axios.create(
  {
    validateStatus: status=>{
      return status === 200
    }
  })

export default ajax;