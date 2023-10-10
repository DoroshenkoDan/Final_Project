import { HOST } from '../../components/Token'
export default async function getCategories() {
  try {
    const data = await fetch(HOST + '/catalog')
    const categories = await data.json()
    return categories
  } catch (e) {
    console.log(e)
  }
}
