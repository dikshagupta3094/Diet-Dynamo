import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import Banner from "../assets/Banner.jpg";
import { Box, Card, CardContent, Typography } from "@mui/joy";
import Nutritionist from '../assets/Nutritionist.png'
import Synergy from '../assets/Synergy.png'
import Dietitian from '../assets/Dietitian.png'
const HomePage = () => {
  return (
    <HomeLayout>
      <div
        className="h-[100vh] bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div
          className="p-5 flex flex-col items-center justify-center pb-0 rounded-[8px]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
        >
          <div
            className="bg-[rgb(101,183,65)] p-3 items-center justify-center w-max 
          text-amber-50 font-semibold rounded-[5px] text-[18px]"
          >
            Welcome to Diet Dynamo
          </div>
          <br />
          <div className="text-4xl text-center">
            <h1>
              Nourish your body,
              <br /> love your life.
            </h1>
          </div>
          <div className="p-6 pb-4 text-center">
            <p>
              Fuel your body with healthy choices and experience sustained
              energy <br />
              for a life brimming with vitality.
            </p>
          </div>
          <div className="bg-[rgb(101,183,65)] py-2 px-4 mb-3 items-center justify-center w-max text-amber-50 rounded-[5px]">
            <a href="#">
              <button>CONTACT US</button>
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto my-10 text-center">
        <h1 className="font-bold text-[30px]">Our Main Areas of Expertise</h1>
        <p className="mx-auto w-[60%] py-2">
          Our team utilizes their expertise to craft personalized plans for
          weight management, athletic performance, and overall well-being.
          Let&apos;s navigate your health journey together. Don&apos;t worry, we
          got your back!!
        </p>
      </div>
      <Box>
      <Card sx={{ minWidth: 265, maxWidth: 300}}>
      <CardContent sx={{}}>
        <Typography 
        sx={{ fontFamily:'"Cormorant Garamond", sans-serif', 
        fontSize: 24 , 
        fontWeight:'700'}} 
        color="#65B741" gutterBottom>
          <div className="icon">
          <img src={Nutritionist} alt="Nutritionist" />
          </div>
          Personal Nutritionists
        </Typography>
        <Typography variant="body2">
        Our registered dietitians craft personalized plans to help you reach your goals, 
        whether it&apos;s weight loss, peak performance, or just healthier eating. Consider
        us your personal cheerleaders!
        </Typography>
      </CardContent>
    </Card>

    <Card sx={{ minWidth: 265, maxWidth: 300,}}>
      <CardContent sx={{}}>
      <Typography 
        sx={{ fontFamily:'"Cormorant Garamond", sans-serif', 
        fontSize: 24 ,
        fontWeight:'700'}} 
        color="#65B741" gutterBottom>
          <div className="icon">
          <img src={Dietitian} alt="Dietitian" />
          </div>
            Dietitian Nutritionists
        </Typography>
        <Typography variant="body2">
        Our registered dietitian nutritionists translate science into practical plans for weight
        management, athletic performance, and overall well-being. Let&apos;s build a healthier you, together.
        </Typography>
      </CardContent>
    </Card>

    <Card sx={{ minWidth: 265, maxWidth: 300  }}>
      <CardContent sx={{}}>
      <Typography 
        sx={{ fontFamily:'"Cormorant Garamond", sans-serif', 
        fontSize: 24 , 
        fontWeight:'700'}} 
        color="#65B741" gutterBottom>
          <div className="icon">
          <img src={Synergy} alt="Synergy" />
          </div>
          Nutritious Lifecycle
        </Typography>
        <Typography variant="body2">
        Your body&apos;s needs change throughout life. We offer personalized guidance for all ages,
        from building strong bones to maintaining vitality. Let&apos;s fuel your journey, together.
        </Typography>
      </CardContent>
    </Card>
    </Box>
    </HomeLayout>
  );
};

export default HomePage;
