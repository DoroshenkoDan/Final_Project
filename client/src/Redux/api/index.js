
async function getProducts() {
  try {
    const data = await fetch(process.env.PUBLIC_URL + '/api/products/home')
    // const data = await fetch("http://localhost:4000/api/products")
    // const data = await fetch(process.env.PUBLIC_URL + '/products.json')

    const products = await data.json()
    // console.log( products, "123213");
    return products
  } catch (e) {
    console.log(e)
  }
}

async function getAllProducts(input) {
  const selectedBrands = []
  const selectedCategories = []
  const selectedPrices = []

  for (const brand in input.brands) {
    if (input.brands[brand] === true) {
      selectedBrands.push(brand)
    }
  }

  for (const category in input.categories) {
    if (input.categories[category] === true) {
      selectedCategories.push(category)
    }
  }

  for (const price in input.prices) {
    if (input.prices[price] === true) {
      selectedPrices.push(price)
    }
  }

  try {
    if (
      selectedBrands.length > 0 ||
      selectedCategories.length > 0 ||
      selectedPrices.length > 0
    ) {
      const data = await fetch(
        process.env.PUBLIC_URL +
          `/api/products?brand=${selectedBrands}&categories=${selectedCategories}&currentPrice=${selectedPrices}`,
      )
      const products = await data.json()
      return products
    } else {
      const data = await fetch(
        process.env.PUBLIC_URL +
          `/api/products?addItems=${input.addItems}&items=${input.items}`,
      )
      const products = await data.json()
      return products
    }
  } catch (e) {
    console.log(e)
  }
}

const  exportedObject = {
  getProducts,
  getAllProducts,
}

export default exportedObject
