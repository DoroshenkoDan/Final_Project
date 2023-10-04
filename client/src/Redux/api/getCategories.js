export default async function getCategories() {
  try {
    const data = await fetch(process.env.PUBLIC_URL + '/clientBack.json')
    const categories = await data.json()
    return categories
  } catch (e) {
    console.log(e)
  }
}
