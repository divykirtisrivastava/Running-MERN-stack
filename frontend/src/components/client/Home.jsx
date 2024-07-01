import React, { useEffect, useState ,useContext} from 'react'
import { BarChart, Wallet, Newspaper, BellRing, Paperclip, Brush, Wrench } from 'lucide-react'
import axios from 'axios'
import UserContext from '../../Context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
export default function Home() {
  let [data, setData] = useState([])
  let [inp, setInp] = useState('')
  let navigation = useNavigate()


  let {token} = useParams()
  let {auth, getGoogleProfile} = useContext(UserContext)

useEffect(()=>{
  if(token){
    localStorage.setItem('token', token)
    getGoogleProfile()
    navigation('/')
  }
}, [token])


  useEffect(() => {
    getData()
    getCart()
  }, [auth])
  async function getData() {
    let result = await axios.get('http://localhost:4000/api/getProduct')
    setData(result.data)
  }
async function oneToFour(){
  let result = await axios.get('http://localhost:4000/api/getProduct')
  let final = result.data.filter((item)=> item.productPrice>= 1000 && item.productPrice<=4000)
  setData(final)
}
async function fourToten(){
  let result = await axios.get('http://localhost:4000/api/getProduct')
  let final = result.data.filter((item)=> item.productPrice>= 4000 && item.productPrice<=10000)
  setData(final)
}

async function getDataByBrand(){
  let result = await axios.get(`http://localhost:4000/api/getProductByBrand/${inp}`)
  setData(result.data)
}
let{setList}=useContext(UserContext)
  useEffect(()=>{
    getCart()
  }, [])

  async function getCart(){
   if(auth.username){
    let result = await axios.get(`http://localhost:4000/api/getCart/${auth.username}`)
    
    setList(result.data.length)
   }
  }


async function addtoCart(data){
 if(auth.username){
  await axios.post(`http://localhost:4000/api/saveCart/${auth.username}`, {
    productBrand: data.productBrand,
    productType: data.productType,
    productRating: data.productRating,
    productPrice: data.productPrice,
    productImages: data.productImages,

  })
  alert("product saved into cart")
  getCart()
 }else{
  navigation('/userLogin')
 }
}
  return (
    <>
      <aside className="flex fixed h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">

        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-white">Search By Product Brand</label>

              <form class="max-w-md mx-auto">
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required 
                  onChange={(e)=>setInp(e.target.value)}
                  />

                </div>
              </form>

              <button
                className="flex transform items-center bg-gray-200 rounded-lg px-3 py-2 text-black-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-600"
              onClick={getDataByBrand}
              >
                <span className="mx-2 text-sm font-medium">Search</span>
              </button>
              <button
                className="flex transform items-center bg-gray-200 rounded-lg px-3 py-2 text-black-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-600"
                onClick={getData}

              >
                <span className="mx-2 text-sm font-medium">All</span>
              </button>
            </div>
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-white">Price</label>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                onClick={oneToFour}
              >
                <span className="mx-2 text-sm font-medium">1000Rs - 4000Rs</span>
              </button>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                onClick={fourToten}
              >
                <span className="mx-2 text-sm font-medium">4000Rs - 10000Rs</span>
              </button>
              
            </div>
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-white">Type</label>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="mx-2 text-sm font-medium">Laptop</span>
              </button>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="mx-2 text-sm font-medium">Watch</span>
              </button>
              
            </div>
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-white">Rating</label>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="mx-2 text-sm font-medium">⭐</span>
              </button>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="mx-2 text-sm font-medium">⭐⭐</span>
              </button>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="mx-2 text-sm font-medium">⭐⭐⭐</span>
              </button>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="mx-2 text-sm font-medium">⭐⭐⭐⭐</span>
              </button>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="mx-2 text-sm font-medium">⭐⭐⭐⭐⭐</span>
              </button>
              
            </div>
           
          </nav>
        </div>
      </aside>


      <div className="absolute flex flex-wrap justify-evenly w-[900px] left-[280px] top-[100px]">
        {data.map((data) => (
          <div className="w-[300px] rounded-md border">
            <img
              src={`http://localhost:4000/${data.productImages}`}
              alt="Laptop"
              className="h-[200px] w-full rounded-md object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold">Product ID:- <span>{data.id}</span></h1>
              <h1 className="text-lg font-semibold">productBrand:- <span>{data.productBrand}</span></h1>
              <h1 className="text-lg font-semibold">productType:- <span>{data.productType}</span></h1>
              <h1 className="text-lg font-semibold">productRating :- <span>{data.productRating}</span></h1>
              <h1 className="text-lg font-semibold">productPrice :- <span>{data.productPrice}</span></h1>

              <button
                type="button"
                onClick={()=>addtoCart(data)}
                className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
