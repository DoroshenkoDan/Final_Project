export default async function getProducts() {
  try {
    const data = await fetch(process.env.PUBLIC_URL + '/products.json')
    const products = await data.json()
    return products
  } catch (e) {
    console.log(e)
  }
}
