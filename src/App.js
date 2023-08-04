import './App.css'
import qrcode from "./qrcode.jpg";

function App() {
  const submitHandler = async () => {
    const url = "http://127.0.0.1:3333/fakepayment/confirm"
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
    }
    console.log(res)
  }

  return (
    <div className="App">
      <h2>Scan the QR code using Alipay</h2>
      <img src={qrcode} alt='qrcode'/>
      <button onClick={submitHandler}>I HAVE PAID</button>
    </div>
  );
}

export default App;
