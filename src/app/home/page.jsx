import React from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="mt-20 flex md:flex-row flex-col gap-10 ">
        <div className="rounded-br-[70px] md:w-1/2 md:-mt-2 lg:max-w-screen-lg">
          <img
            className="w-full rounded-b-[70px] md:rounded-br-[70px]"
            src="https://placehold.co/1000x800"
            alt="Hero Image"
          />
        </div>

        <div className="place-self-center flex justify-center flex-col md:w-2/5 lg:px-14 xl:px-20 xl:pr-24 px-8 md:px-10 gap-3">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Discover the power of plant disease detection and curing your
            plants!
          </h1>
          <h3 className="mt-4 ">
            Upload pictures of your plants and get disease details, solutions,
            and product recommendations
          </h3>
          <div className="mt-4 flex gap-6">
            <button className="border rounded-[10px] py-3 px-5 bg-gcNeutrals-100">
              Explore
            </button>
            <button className="border rounded-[10px] p-3">Learn More</button>
          </div>
        </div>
      </section>

      <section className="my-32 flex justify-center items-center flex-col text-left md:text-center px-8 md:px-10">
        <div className="flex flex-col justify-center items-center px-8 md:px-0">
          <h1 className="text-3xl lg:text-5xl font-bold mt-4 lg:w-2/6 text-center">
            Uncover the Plant Knowledge
          </h1>
          <h3 className="mt-6 md:w-1/2 text-center">
            Our platform offers a range of powerful features designed to help
            you identify plant diseases, access a comprehensive library of plant
            information, and engage with a community of plant enthusiasts.
          </h3>
        </div>
        <div className="mt-16 flex gap-8 flex-wrap justify-center w-full">
          <div className="max-w-[550px]">
            <img
              src="https://placehold.co/550x350"
              alt="Plant Disease Detection"
              className="rounded-[30px]"
            />
            <div className="w-full mt-4 md:px-7">
              <h1 className="text-3xl font-bold">Plant Disease Detection</h1>
              <h3 className="mt-4">
                Upload pictures of plants to get disease details, solutions, and
                product recommendations.
              </h3>
            </div>
          </div>
          <div className="max-w-[550px]">
            <img
              src="https://placehold.co/550x350"
              alt="Plant Disease Detection"
              className="rounded-[30px]"
            />
            <div className="w-full mt-4 md:px-7">
              <h1 className="text-3xl font-bold">
                Library of Plant Information
              </h1>
              <h3 className="mt-4">
                Access a comprehensive library of information on various plants
                and their diseases.
              </h3>
            </div>
          </div>
          <div className="max-w-[550px]">
            <img
              src="https://placehold.co/550x350"
              alt="Plant Disease Detection"
              className="rounded-[30px]"
            />
            <div className="w-full mt-4 md:px-7">
              <h1 className="text-3xl font-bold">
                Engage in Community Discussions
              </h1>
              <h3 className="mt-4">
                Share writings, pictures, and videos, and participate in
                discussions with fellow plant enthusiasts.
              </h3>
            </div>
          </div>
        </div>
        <button className="border rounded-[10px] p-3 mt-14 text-sm md:text-md lg:text-xl">
          Learn More
        </button>
      </section>

      <section className="my-32 flex justify-center items-center w-full lg:flex-row flex-col-reverse lg:gap-3 gap-5 px-8 md:px-10">
        <div className="flex flex-col lg:w-1/2 gap-8 justify-center items-center">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold">
              Empower Your Gardening with Plant Disease Detection
            </h1>
            <p className="mt-8">
              {`Our plant disease detection tool is a game-changer for gardeners and farmers. It provides accurate disease details, effective solutions, and personalized product recommendations, all based on the pictures of your plants that
              you upload. With our extensive library of plant diseases, a vibrant discussion forum, and advanced monitoring features, you'll have everything you need to keep your plants healthy and thriving.`}
            </p>
          </div>
          <div className="flex gap-4">
            <div>
              <h3 className="text-2xl font-bold">Expert Advice</h3>
              <p className="mt-4">
                Get expert advice on plant diseases, solutions, and product
                recommendations from our community.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Plant Monitoring</h3>
              <p className="mt-4">
                Monitor your plants with AI-powered automatic monitoring, manual
                methods, and customizable schedules.
              </p>
            </div>
          </div>
          <button className="border rounded-[10px] p-3 mt-3 place-self-start">
            Learn More
          </button>
        </div>
        <div className="w-full lg:w-1/2 flex">
          <img
            src="https://placehold.co/770x800"
            alt=""
            className="m-auto rounded-[70px] "
          />
        </div>
      </section>

      <section className="my-32 px-8 md:px-10">
        <div className="text-center flex flex-col gap justify-center items-center">
          <h1 className="text-3xl lg:text-5xl font-bold">{`Services That Empower Your Plant's Health`}</h1>
          <p className="mt-8 md:w-1/2 text-center">
            Our comprehensive range of services includes plant monitoring,
            weather predictions, and scheduling. With our advanced technology
            and expert knowledge, we provide you with the tools and information
            you need to keep your plants healthy and thriving.
          </p>
        </div>
        <div className="flex justify-center items-center gap-5 md:gap-20 text-center mt-10 md:flex-row flex-col">
          <div className="max-w-96 flex flex-col items-center justify-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-0.5 -0.5 16 16"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-triangle"
              id="Triangle--Streamline-Feather"
              height="200"
              width="200"
            >
              <desc>Triangle Streamline Icon: https://streamlinehq.com</desc>
              <path
                d="M6.4312499999999995 2.4125 1.1375 11.25a1.25 1.25 0 0 0 1.06875 1.875h10.5875a1.25 1.25 0 0 0 1.06875 -1.875L8.568750000000001 2.4125a1.25 1.25 0 0 0 -2.1375 0z"
                strokeWidth="1"
              ></path>
            </svg>
            <h1 className="text-3xl font-bold mt-2">Plant Monitoring</h1>
            <p>
              Stay informed about the health of your plants with our automatic
              monitoring system. Our AI-powered technology and manual methods
              ensure accurate and timely detection of diseases and other issues.
            </p>
          </div>
          <div className="max-w-96 flex flex-col items-center justify-center gap-4">
            <svg
              id="Circle-Outline--Streamline-Carbon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              height="200"
              width="200"
              strokeWidth="1"
            >
              <desc>
                Circle Outline Streamline Icon: https://streamlinehq.com
              </desc>
              <defs></defs>
              <path
                d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2Zm0 26C9.3726 28 4 22.6274 4 16S9.3726 4 16 4s12 5.3726 12 12-5.3726 12-12 12Z"
                strokeWidth="0"
              ></path>
              <path
                id="_Transparent_Rectangle_"
                transform="rotate(180 16 16)"
                d="M0 0h32v32H0Z"
                strokeWidth="0"
                fill="none"
              ></path>
            </svg>
            <h1 className="text-3xl font-bold mt-2">Weather Predictions</h1>
            <p>
              Plan your gardening activities with confidence using our weather
              predictions and warnings. Stay ahead of changing weather
              conditions to protect your plants from potential damage.
            </p>
          </div>
          <div className="max-w-96 flex flex-col items-center justify-center gap-4">
            <svg
              id="Square-Outline--Streamline-Carbon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              height="200"
              width="200"
              strokeWidth="1"
            >
              <desc>
                Square Outline Streamline Icon: https://streamlinehq.com
              </desc>
              <defs></defs>
              <path
                d="M26 4H6c-1.1046 0-2 .8954-2 2v20c0 1.1046.8954 2 2 2h20c1.1046 0 2-.8954 2-2V6c0-1.1046-.8954-2-2-2ZM6 26V6h20v20H6Z"
                strokeWidth="0"
              ></path>
              <path
                id="_Transparent_Rectangle_"
                transform="rotate(180 16 16)"
                d="M0 0h32v32H0Z"
                strokeWidth="0"
                fill="none"
              ></path>
            </svg>
            <h1 className="text-3xl font-bold mt-2">Scheduling</h1>
            <p>
              Optimize your plant care routine with our scheduling feature. Set
              reminders for watering, medicine/fertilizer application, and other
              important tasks to ensure your plants receive the care they need.
            </p>
          </div>
        </div>
      </section>

      <section className="my-32 px-8 md:px-10">
        <div className="text-center flex flex-col gap justify-center items-center px-8 md:px-10">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Empowering Plant Lovers
          </h1>
          <p className="mt-8 md:w-1/2 text-center">{`Users have successfully diagnosed plant diseases using our tool. Join our community and take control of your plants' health.`}</p>
        </div>
        <div className="flex justify-center items-center gap-5 md:gap-20 text-left mt-10 md:flex-row flex-col">
          <div className="max-w-96 flex flex-col items-start justify-center gap-6 border p-5 rounded-lg">
            <h1 className="text-3xl font-bold mt-2">{`"Quote"`}</h1>
            <div className="flex gap-4">
              <img
                src="https://placehold.co/50x50"
                alt="Profile"
                className="rounded-full"
              />
              <div className="flex flex-col text-left">
                <h3>Nama</h3>
                <h3>Pekerjaan</h3>
              </div>
            </div>
          </div>
          <div className="max-w-96 flex flex-col items-start justify-center gap-6 border p-5 rounded-lg">
            <h1 className="text-3xl font-bold mt-2">{`"Quote"`}</h1>
            <div className="flex gap-4">
              <img
                src="https://placehold.co/50x50"
                alt="Profile"
                className="rounded-full"
              />
              <div className="flex flex-col text-left">
                <h3>Nama</h3>
                <h3>Pekerjaan</h3>
              </div>
            </div>
          </div>
          <div className="max-w-96 flex flex-col items-start justify-center gap-6 border p-5 rounded-lg">
            <h1 className="text-3xl font-bold mt-2">{`"Quote"`}</h1>
            <div className="flex gap-4">
              <img
                src="https://placehold.co/50x50"
                alt="Profile"
                className="rounded-full"
              />
              <div className="flex flex-col text-left">
                <h3>Nama</h3>
                <h3>Pekerjaan</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
