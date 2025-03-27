import React from 'react'
import HomeLayout from '../Layout/HomeLayout'
import Banner from '../assets/Banner.jpg'
const HomePage = () => {
  return (
    <HomeLayout>
      <div className="" style={{ backgroundImage: `url(${Banner})`, 
        display:"flex", justifyItems:"center", alignItems:"center", backgroundPosition:"center", 
        backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
        <div className="">
          <div className=''>Welcome to Diet Dynamo</div><br />
          <h1>Nourish your body,<br /> love your life.</h1>
          <p>Fuel your body with healthy choices and experience sustained energy <br />
           for a life brimming with vitality.</p>
          {/* <Link to="/contact">
            <button>CONTACT US</button>
          </Link> */}
        </div>
      </div>
    </HomeLayout>
  )
}

export default HomePage
