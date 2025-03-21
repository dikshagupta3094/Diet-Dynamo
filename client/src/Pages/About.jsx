import React, { useState } from "react";
// import Layout from '../components/Layout'
import { Typography, Box, Button } from "@mui/material";
import About1 from "../assets/About1.jpeg";
import About2 from "../assets/About2.jpeg";
// import "../styles/About.css"

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* <Layout> */}
      <Box
        sx={{
          mb: 15,
          textAlign: "center",
          p: 2,
          "& h4": {
            fontWeight: "bold",
            my: 2,
            fontSize: "2rem",
          },
          "& p": {
            textAlign: "justify",
          },
          "@media (max-width:600px)": {
            mt: 0,
            "& h4 ": {
              fontSize: "1.5rem",
            },
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#65B741",
            marginTop: 0,
          }}
        >
          About <br />
          Diet Dynamo
        </Typography>

        <div className="lg:flex mb-30">
          <img src={About1} className="w-full lg:w-2/5" alt="" />
          <div className="lg:flex-1 pl-5">
            <h4>Better Eat, Better Life</h4>
            <h2 className="text-gray-700 italic mb-2">
              If you get Better Nutrition, You Can <br />
              Enjoy a Healthy Age
            </h2>
            <p className="p-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
              quod, suscipit, aperiam totam autem culpa cum eveniet dolorum
              quasi est perspiciatis laborum. Nam recusandae nihil quia odio
              voluptatibus facere omnis facilis rerum? Ab eum beatae nobis
              reiciendis, qui temporibus aliquid, nesciunt velit sed quam
              recusandae necessitatibus, tempora maxime. Repellendus incidunt,
              maxime labore dolorum eos aperiam unde? At veritatis nesciunt eos
              quas cupiditate blanditiis est quam maiores, amet, soluta
              exercitationem voluptatum, veniam assumenda? Ratione perferendis
              officiis deserunt nostrum aspernatur sed asperiores! Earum sunt
              placeat ducimus sint, deleniti amet esse saepe voluptatem commodi
              laudantium quibusdam repellat nobis libero at consectetur adipisci
              ipsa.
            </p>

            <p id="more" style={{ display: isExpanded ? "block" : "none" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic sunt,
              molestias dolor incidunt nemo sed voluptate libero voluptatem at
              aliquid ullam dolores maxime nostrum, ipsam voluptas placeat
              cupiditate. Repellat, laudantium voluptatum, doloribus corporis
              deserunt eligendi aliquid dicta aperiam maxime necessitatibus
              excepturi aspernatur perspiciatis in eos quisquam impedit ex
              assumenda et beatae expedita pariatur est libero vel magni!
              Explicabo eligendi impedit ab odio soluta laborum similique quasi
              fuga laboriosam sunt.
            </p>
            <Button
              onClick={toggleExpansion}
              variant="contained"
              sx={{ bgcolor: "#65B741", margin:"12px" }}
            >
              {isExpanded ? "View less" : "View more"}
            </Button>
          </div>
        </div>
        <div className="mt-30 lg:flex ">
        <img src={About2} className="w-full lg:hidden" alt="" />
          <div className="lg:flex-1 lg:pr-5">
            <h4>Sweat now, Smile later.</h4>
            <h2 className="text-gray-600 italic mb-2">
              You won&apos;t regret a Workout, but you might <br />
              Regret Skipping it
            </h2>
            <p className="p-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
              quod, suscipit, aperiam totam autem culpa cum eveniet dolorum
              quasi est perspiciatis laborum. Nam recusandae nihil quia odio
              voluptatibus facere omnis facilis rerum? Ab eum beatae nobis
              reiciendis, qui temporibus aliquid, nesciunt velit sed quam
              recusandae necessitatibus, tempora maxime. Repellendus incidunt,
              maxime labore dolorum eos aperiam unde? At veritatis nesciunt eos
              quas cupiditate blanditiis est quam maiores, amet, soluta
              exercitationem voluptatum, veniam assumenda? Ratione perferendis
              officiis deserunt nostrum aspernatur sed asperiores! Earum sunt
              placeat ducimus sint, deleniti amet esse saepe voluptatem commodi
              laudantium quibusdam repellat nobis libero at consectetur adipisci
              ipsa.
            </p>
            <p id="more" style={{ display: isExpanded ? "block" : "none"}} className="ease-out">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic sunt,
              molestias dolor incidunt nemo sed voluptate libero voluptatem at
              aliquid ullam dolores maxime nostrum, ipsam voluptas placeat
              cupiditate. Repellat, laudantium voluptatum, doloribus corporis
              deserunt eligendi aliquid dicta aperiam maxime necessitatibus
              excepturi aspernatur perspiciatis in eos quisquam impedit ex
              assumenda et beatae expedita pariatur est libero vel magni!
              Explicabo eligendi impedit ab odio soluta laborum similique quasi
              fuga laboriosam sunt.
            </p>
            <Button
              onClick={toggleExpansion}
              variant="contained"
              sx={{ bgcolor: "#65B741", margin:"12px" }}
            >
              {isExpanded ? "View less" : "View more"}
            </Button>
          </div>
          <img src={About2} className="w-full md:hidden lg:block lg:w-2/5 " alt="" />
        </div>
      </Box>
      {/* </Layout> */}
    </>
  );
};

export default About;
