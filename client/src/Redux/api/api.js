import { HOST } from '../../components/Token'
export default async function api(apiName) {
  try {
    const data = await fetch(HOST + `/${apiName}`)
    const categories = await data.json()
    return categories
  } catch (e) {
    console.log(e)
  }
}
