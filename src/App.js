import { useEffect, useState } from 'react';
import './App.css'
import qrcode from "./qrcode.jpg";

function App() {
  const [price, setPrice] = useState("")
  useEffect(() => {
    const fetchPrice = async () => {
      const url = "http://172.31.90.59:3333/fakepayment/price"
      const res = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if(!res || !res.ok){
        console.log("Couldn't get price")
        throw new Error("Couldn't get price")
      }
      const data = await res.json()
      if(data && data.flag){
        setPrice(data.price)
        console.log(data)
      }       
    }
    fetchPrice()
  }, [])


  const submitHandler = async () => {
    const url = "http://172.31.90.59:3333/fakepayment/confirm"
    const data = {
      checkKey: ""
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if(!res || !res.ok){
      throw new Error('Network response was not ok');
    }else{
      window.close()
    }
    // console.log(res)
  }

  return (
    <div className="App">
      <h2>Scan the QR code using Alipay</h2>
      <img src={qrcode} alt='qrcode'/>
      <h3>{price}</h3>
      <button onClick={submitHandler}>I HAVE PAID</button>
    </div>
  );
}

export default App;
