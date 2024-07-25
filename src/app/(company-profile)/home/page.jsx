import React from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-br from-gcNeutrals-baseWhite to-gcPrimary-basePrimary">
        <Navbar />
        <section className="mt-16 flex md:flex-row flex-col gap-10">
          <div className="rounded-br-[70px] md:w-3/5 -mt-3 lg:max-w-screen-lg relative md:h-max h-36 overflow-hidden">
            <img className="w-full md:h-full rounded-br-[70px] bg-cover" src="/images/close-up-woman-s-hand-holding-smartphone-near-plants.jpg" alt="Hero Image" />
            <div className="w-full absolute top-0 bottom-0 left-0 right-0 rounded-br-[70px] bg-gradient-to-br from-transparent to-gcPrimary-900 inset-0 opacity-100"></div>
          </div>

          <div className="place-self-center flex justify-center flex-col md:w-2/5 lg:gap-3 text-gcPrimary-1000 md:pr-8 md:pl-0 px-8">
            <h1 className="gcHeading1p gcDropShadow">Discover the power of plant disease detection and curing your plants!</h1>
            <h3 className="mt-4 gcBody1p gcDropShadow">Upload pictures of your plants and get disease details, solutions, and product recommendations</h3>
            <div className="mt-4 flex gap-6 justify-start items-center">
              <button className="rounded-[10px] py-2.5 px-6 bg-gcPrimary-1000 text-gcNeutrals-baseWhite gcContentAccent1p gcDropShadow">Explore</button>
              <button className="rounded-[10px] py-2.5 px-4 bg-gcPrimary-600 text-gcNeutrals-baseWhite gcContentAccent1p gcDropShadow">Learn More</button>
            </div>
          </div>
        </section>

        <section className="md:my-32 my-20 flex justify-center items-center flex-col text-left md:text-center px-8 md:px-10 text-gcPrimary-1000">
          <div className="flex flex-col justify-center items-center md:px-0">
            <h1 className="gcHeading1p mt-4 xl:w-2/6 text-center xl:px-8">Uncover the Plant Knowledge</h1>
            <h3 className="mt-6 md:w-1/2 gcBody1p">
              Our platform offers a range of powerful features designed to help you identify plant diseases, access a comprehensive library of plant information, and engage with a community of plant enthusiasts.
            </h3>
          </div>
          <div className="mt-8 md:mt-16 flex md:gap-6 gap-3 flex-wrap justify-center w-full">
            <div className="max-w-[500px] md:block flex flex-row gap-3 justify-center items-center">
              <img src="https://placehold.co/550x400" alt="Plant Disease Detection" className="rounded-[30px] w-1/2 md:w-full" />
              <div className="w-full md:mt-4 md:px-16 flex flex-col gap-2">
                <h1 className="gcHeading2p">Plant Disease Detection</h1>
                <h3 className="md:mt-4 gcBody1p">Upload pictures of plants to get disease details, solutions, and product recommendations.</h3>
              </div>
            </div>
            <div className="max-w-[500px] md:block flex flex-row-reverse gap-3 justify-center items-center">
              <img src="https://placehold.co/550x400" alt="Plant Disease Detection" className="rounded-[30px] w-1/2 md:w-full" />
              <div className="w-full mt-4 md:px-16 flex flex-col gap-2 text-right md:text-center">
                <h1 className="gcHeading2p">Library of Plant Information</h1>
                <h3 className="md:mt-4 gcBody1p">Access a comprehensive library of information on various plants and their diseases.</h3>
              </div>
            </div>
            <div className="max-w-[500px] md:block flex flex-row gap-3 justify-center items-center">
              <img src="https://placehold.co/550x400" alt="Plant Disease Detection" className="rounded-[30px] w-1/2 md:w-full" />
              <div className="w-full mt-4 md:px-16 flex flex-col gap-2">
                <h1 className="gcHeading2p">Engage in Community Discussions</h1>
                <h3 className="md:mt-4 gcBody1p">Share writings, pictures, and videos, and participate in discussions with fellow plant enthusiasts.</h3>
              </div>
            </div>
          </div>
          <button className="rounded-[10px] py-2.5 px-6 mt-10 bg-gcPrimary-1000 text-gcNeutrals-baseWhite gcContentAccent1p gcDropShadow">Learn More</button>
        </section>

        <section className="my-32 flex justify-center items-center w-full lg:flex-row flex-col-reverse lg:gap-10 gap-5 px-8 md:px-10 text-gcPrimary-1000">
          <div className="flex flex-col lg:w-3/5 md:gap-8 gap-6 justify-center items-center">
            <div>
              <h1 className="gcHeading1p leading-8 md:text-left text-center">Empower Your Gardening with Plant Disease Detection</h1>
              <p className="md:mt-8 mt-5 gcBody1p">
                {`Our plant disease detection tool is a game-changer for gardeners and farmers. It provides accurate disease details, effective solutions, and personalized product recommendations, all based on the pictures of your plants that
              you upload. With our extensive library of plant diseases, a vibrant discussion forum, and advanced monitoring features, you'll have everything you need to keep your plants healthy and thriving.`}
              </p>
            </div>
            <div className="flex gap-8 justify-center items-center">
              <div className="w-2/5 md:hidden flex">
                <img src="https://placehold.co/750x800" alt="" className="m-auto rounded-2xl " />
              </div>
              <div className="flex md:flex-row flex-col gap-4 md:w-full w-3/5">
                <div>
                  <h3 className="gcHeading2p">Expert Advice</h3>
                  <p className="md:mt-4 mt-3 gcBody1p">Get expert advice on plant diseases, solutions, and product recommendations from our community.</p>
                </div>
                <div className="md:mt-0 mt-3">
                  <h3 className="gcHeading2p">Plant Monitoring</h3>
                  <p className="md:mt-4 mt-3 gcBody1p">Monitor your plants with AI-powered automatic monitoring, manual methods, and customizable schedules.</p>
                </div>
              </div>
            </div>
            <button className="rounded-[10px] mt-2 py-2.5 px-6 bg-gcPrimary-1000 text-gcNeutrals-baseWhite md:place-self-start place-self-center gcContentAccent1p gcDropShadow">Learn More</button>
          </div>
          <div className="w-full md:w-2/5 lg:w-2/5 md:flex hidden">
            <img src="https://placehold.co/750x800" alt="" className="m-auto rounded-2xl " />
          </div>
        </section>

        <section className="my-32 px-8 md:px-10 text-gcPrimary-1000">
          <div className="text-center flex flex-col gap justify-center items-center">
            <h1 className="gcHeading1p lg:w-3/4 xl:w-2/5">{`Services That Empower Your Plant's Health`}</h1>
          </div>
          <div className="flex justify-center items-start gap-5 md:gap-8 text-center mt-10 lg:mt-14 lg:flex-row flex-col">
            <div className="lg:max-w-xl flex flex-row lg:flex-col items-center justify-start lg:gap-4 gap-6 lg:text-center text-left">
              <div className="p-4 w-1/4 h-1/4 lg:w-40 lg:h-40 bg-gcPrimary-1000 flex justify-center items-center rounded-[20px]">
                <img className="gcDropShadow" src="/images/plant-monitoring.png" alt="Plant Monitoring" />
              </div>
              <div className="flex w-3/4 mt-2 flex-col">
                <h1 className="gcHeading2p">Plant Monitoring</h1>
                <p className="mt-3 gcBody1p">
                  Stay informed about the health of your plants with our automatic monitoring system. Our AI-powered technology and manual methods ensure accurate and timely detection of diseases and other issues.
                </p>
              </div>
            </div>
            <div className="lg:max-w-xl flex flex-row lg:flex-col items-center justify-start lg:gap-4 gap-6 lg:text-center text-left">
              <div className="p-4 w-1/4 h-1/4 lg:w-40 lg:h-40 bg-gcPrimary-1000 flex justify-center items-center rounded-[20px]">
                <img className="gcDropShadow" src="/images/weather.png" alt="Weather" />
              </div>
              <div className="flex w-3/4 mt-2 flex-col">
                <h1 className="gcHeading2p mt-2">Weather Predictions</h1>
                <p className="mt-3 gcBody1p">Plan your gardening activities with confidence using our weather predictions and warnings. Stay ahead of changing weather conditions to protect your plants from potential damage.</p>
              </div>
            </div>
            <div className="lg:max-w-xl flex flex-row lg:flex-col items-center justify-start lg:gap-4 gap-6 lg:text-center text-left">
              <div className="p-4 w-1/4 h-1/4 lg:w-40 lg:h-40 bg-gcPrimary-1000 flex justify-center items-center rounded-[20px]">
                <img className="gcDropShadow" src="/images/schedule.png" alt="Scheduling" />
              </div>
              <div className="flex w-3/4 mt-2 flex-col">
                <h1 className="gcHeading2p mt-2">Scheduling</h1>
                <p className="mt-3 gcBody1p">
                  Optimize your plant care routine with our scheduling feature. Set reminders for watering, medicine/fertilizer application, and other important tasks to ensure your plants receive the care they need.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="my-32 px-8 md:px-10 text-gcPrimary-1000">
          <div className="text-center flex flex-col gap justify-center items-center px-8 md:px-10">
            <h1 className="gcHeading1p">Empowering Plant Lovers</h1>
          </div>
          <div className="flex justify-center items-center gap-5 md:gap-8 text-left md:mt-12 mt-7 md:flex-row flex-wrap">
            <div className="flex flex-col items-start justify-center gap-4 lg:gap-6 py-3 px-2 md:px-4 md:py-5 lg:px-7 xl:w-[550px] lg:w-[500px] md:w-[400px] sm:w-[300px] w-[150px] rounded-lg bg-gcNeutrals-baseWhite">
              <h1 className="gcHeadingQuote mt-2">{`"Quote"`}</h1>
              <div className="flex gap-4 justify-center items-center">
                <img src="https://placehold.co/50x50" alt="Profile" className="rounded-full" />
                <div className="flex flex-col text-left">
                  <h3 className="gcBodyQuote text-gcSecondary-600 font-semibold">Nama</h3>
                  <h3 className="gcBodyQuote text-[#b3b3b3] font-medium">Pekerjaan</h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-4 lg:gap-6 py-3 px-2 md:px-4 md:py-5 lg:px-7 xl:w-[550px] lg:w-[500px] md:w-[400px] sm:w-[300px] w-[150px] rounded-lg bg-gcNeutrals-baseWhite">
              <h1 className="gcHeadingQuote mt-2">{`"Quote"`}</h1>
              <div className="flex gap-4 justify-center items-center">
                <img src="https://placehold.co/50x50" alt="Profile" className="rounded-full" />
                <div className="flex flex-col text-left">
                  <h3 className="gcBodyQuote text-gcSecondary-600 font-semibold">Nama</h3>
                  <h3 className="gcBodyQuote text-[#b3b3b3] font-medium">Pekerjaan</h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-4 lg:gap-6 py-3 px-2 md:px-4 md:py-5 lg:px-7 xl:w-[550px] lg:w-[500px] md:w-[400px] sm:w-[300px] w-[150px] rounded-lg bg-gcNeutrals-baseWhite">
              <h1 className="gcHeadingQuote mt-2">{`"Quote"`}</h1>
              <div className="flex gap-4 justify-center items-center">
                <img src="https://placehold.co/50x50" alt="Profile" className="rounded-full" />
                <div className="flex flex-col text-left">
                  <h3 className="gcBodyQuote text-gcSecondary-600 font-semibold">Nama</h3>
                  <h3 className="gcBodyQuote text-[#b3b3b3] font-medium">Pekerjaan</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
