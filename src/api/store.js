import axios from 'axios'

export const serverUrl = 'https://www.feizhouxianyu.cn:8921'
// export const serverUrl = 'http://127.0.0.1:8920'

export function addSport (data) {
  return axios({
    method: 'post',
    url: `${serverUrl}`,
    params: {
      user: data.user,
      date: data.date,
      walk: data.walk,
      sport: data.sport,
      weight: data.weight,
      fatRatio: data.fatRatio
    }
  })
}
