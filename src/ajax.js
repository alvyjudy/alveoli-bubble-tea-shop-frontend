import axios from "axios";

const ajax = () => {
  const instance = axios.create({
    validateStatus: status => status === 200
  })

  if (process.env.ENV === 'local') {
    instance.interceptors.request.use((config)=>{
      console.log("Request config:", config)
      return config
    })
  }

  return instance
}

export default ajax();