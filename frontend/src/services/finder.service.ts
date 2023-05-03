import axios from 'axios'

const request_url = 'http://localhost:8001/'

const findStopWord = async (query: string): Promise<any> => {
    
    const request_url = 'http://localhost:8001/'

    const res = await axios.get(request_url, { params: { text: query } })
    return res.data
  }

  const DFA_API = {
    findStopWord
  }
  
  export default DFA_API