import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
import axios from "axios";

const HOST = 'http://localhost:4000/api'
const userData = {
  loginOrEmail: "customer@gmail.com",
  password: "1111111"
}

let token



async function refreshAccessToken() {
  await axios
      .post(HOST + "/customers/login", userData)
      .then(loginResult => {
        token = loginResult.data.token
        // console.log(`==== Login Result`, loginResult )
        // console.log(`==== TOKEN`, token)
      })
      .catch(err => {
        /*Do something with error */
        console.error(err)
      });
}

const axiosApiInstance = axios.create();
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async config => {
      await refreshAccessToken()
      config.headers = {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      return config;
    },
    error => {
      Promise.reject(error)
    });
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    await refreshAccessToken()
    axios.defaults.headers.common['Authorization'] = token;
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

function App() {
  useEffect(() => {
    async function getProducts() {
      try {
        // const response = await fetch('https://api.api-ninjas.com/v1/loremipsum?paragraphs=2')
        const response = await fetch('http://localhost:4000/api/products', {
          method: 'POST',
          body: JSON.stringify(newProduct),
        })
        const data = response.json()
        console.log('==========ОтветБЕК',data)
      } catch (e) {
        console.log(e)
      }
    }

    const newProduct = {
      name: "Next Prod",
      currentPrice: 555,
      previousPrice: 250,
      categories: "men",
      imageUrls: [
        "img/products/men/001.png",
        "img/products/men/002.png",
        "img/products/men/003.png",
        "img/products/men/004.png"
      ],
      quantity: 100,
      color: "red",
      productUrl: "/men",
      brand: "braaaand",
      myCustomParam: "some string or json for custom param",
    };


    axiosApiInstance
        .post(HOST + "/products", newProduct)
        .then(_newProduct => {
            console.log('New product added', _newProduct)
          /*Do something with newProduct*/
        })
        .catch(err => {
            console.error('Error on add product', err)
        });


    axios
        .get(HOST + "/products")
        .then(response => {
          console.log(`=== PRODUCTS`, response.data)
        })
        .catch(err => {
          console.error(`=== PRODUCTS ERROR`, err)
          /*Do something with error, e.g. show error to user*/
        });
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
