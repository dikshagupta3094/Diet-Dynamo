import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import Banner from "../assets/Banner.jpg";
import { Box, Card, CardContent, Typography } from "@mui/joy";
import Nutritionist from "../assets/Nutritionist.png";
import Synergy from "../assets/Synergy.png";
import Dietitian from "../assets/Dietitian.png";

const HomePage = () => {
  return (
    <HomeLayout>
      {/* Hero Section */}
      <div
        className="h-[100vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="p-6 md:p-10 text-center max-w-3xl rounded-lg bg-white/75 shadow-md">
          <div className="bg-[rgb(101,183,65)] px-4 py-2 rounded-md text-white font-semibold text-lg inline-block">
            Welcome to Diet Dynamo
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
            Nourish your body,
            <br />
            love your life.
          </h1>

          <p className="mt-4 text-gray-700 text-base md:text-lg">
            Fuel your body with healthy choices and experience sustained energy
            for a life brimming with vitality.
          </p>

          <div className="mt-6">
            <a
              href="#"
              className="bg-[rgb(101,183,65)] px-6 py-2 rounded-md text-white font-semibold hover:bg-green-700 transition"
            >
              CONTACT US
            </a>
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <section className="mx-auto my-10 text-center px-4">
        <h2 className="font-bold text-2xl md:text-3xl">
          Our Main Areas of Expertise
        </h2>
        <p className="mx-auto mt-2 max-w-3xl text-gray-600">
          Our team utilizes their expertise to craft personalized plans for
          weight management, athletic performance, and overall well-being.
          Let&apos;s navigate your health journey together. Don&apos;t worry, we
          got your back!!
        </p>
      </section>

      {/* Cards Section */}
      <Box
        className="grid gap-6 px-4 pb-12 sm:grid-cols-2 lg:grid-cols-3 place-items-center"
      >
        {/* Card 1 */}
        <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition">
          <CardContent>
            <div className="flex flex-col items-center">
              <img
                src={Nutritionist}
                alt="Nutritionist"
                className="w-20 h-20 mb-4"
              />
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", sans-serif',
                  fontSize: 22,
                  fontWeight: "700",
                }}
                color="#65B741"
                gutterBottom
              >
                Personal Nutritionists
              </Typography>
              <Typography variant="body2" className="text-center text-gray-600">
                Our registered dietitians craft personalized plans to help you
                reach your goals, whether it&apos;s weight loss, peak
                performance, or just healthier eating. Consider us your personal
                cheerleaders!
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition">
          <CardContent>
            <div className="flex flex-col items-center">
              <img src={Dietitian} alt="Dietitian" className="w-20 h-20 mb-4" />
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", sans-serif',
                  fontSize: 22,
                  fontWeight: "700",
                }}
                color="#65B741"
                gutterBottom
              >
                Dietitian Nutritionists
              </Typography>
              <Typography variant="body2" className="text-center text-gray-600">
                Our registered dietitian nutritionists translate science into
                practical plans for weight management, athletic performance, and
                overall well-being. Let&apos;s build a healthier you, together.
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition">
          <CardContent>
            <div className="flex flex-col items-center">
              <img src={Synergy} alt="Synergy" className="w-20 h-20 mb-4" />
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", sans-serif',
                  fontSize: 22,
                  fontWeight: "700",
                }}
                color="#65B741"
                gutterBottom
              >
                Nutritious Lifecycle
              </Typography>
              <Typography variant="body2" className="text-center text-gray-600">
                Your body&apos;s needs change throughout life. We offer
                personalized guidance for all ages, from building strong bones
                to maintaining vitality. Let&apos;s fuel your journey, together.
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Box>
    </HomeLayout>
  );
};

export default HomePage;
