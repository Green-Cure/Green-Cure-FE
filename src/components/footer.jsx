export default function Footer() {
  return (
    <>
      <footer className="bg-gcNeutrals-200 w-full mt-12">
        <div className="flex flex-wrap flex-col w-full py-5 px-8 lg:px-8 md:py-8 gap-4">
          <div className="sm:flex lg:flex-row sm:flex-col sm:gap-4 items-start sm:justify-between lg:border-none border-b pb-4 lg:pb-0">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img className="h-8" src="https://placehold.co/50x50" alt="GreenCure Logo" />
              <span className="self-center text-xl whitespace-nowrap">Green Cure</span>
            </a>
            <ul className="flex flex-wrap mt-4 sm:mt-0 items-center mb-6 text-sm font-medium sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-2 sm:me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Cookie Policy
                </a>
              </li>
            </ul>
            <div className="flex gap-5">
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" className="bi bi-linkedin" viewBox="0 0 16 16" id="Linkedin--Streamline-Bootstrap" height="25" width="25">
                  <desc>Linkedin Streamline Icon: https://streamlinehq.com</desc>
                  <path
                    d="M0 1.146C0 0.513 0.526 0 1.175 0h13.65C15.474 0 16 0.513 16 1.146v13.708c0 0.633 -0.526 1.146 -1.175 1.146H1.175C0.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2 -8.212c0.837 0 1.358 -0.554 1.358 -1.248 -0.015 -0.709 -0.52 -1.248 -1.342 -1.248S2.4 3.226 2.4 3.934c0 0.694 0.521 1.248 1.327 1.248zm4.908 8.212V9.359c0 -0.216 0.016 -0.432 0.08 -0.586 0.173 -0.431 0.568 -0.878 1.232 -0.878 0.869 0 1.216 0.662 1.216 1.634v3.865h2.401V9.25c0 -2.22 -1.184 -3.252 -2.764 -3.252 -1.274 0 -1.845 0.7 -2.165 1.193v0.025h-0.016l0.016 -0.025V6.169h-2.4c0.03 0.678 0 7.225 0 7.225z"
                    strokeWidth="1"
                  ></path>
                </svg>
              </a>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" className="bi bi-instagram" viewBox="0 0 16 16" id="Instagram--Streamline-Bootstrap" height="25" width="25">
                  <desc>Instagram Streamline Icon: https://streamlinehq.com</desc>
                  <path
                    d="M8 0C5.829 0 5.556 0.01 4.703 0.048 3.85 0.088 3.269 0.222 2.76 0.42a3.9 3.9 0 0 0 -1.417 0.923A3.9 3.9 0 0 0 0.42 2.76C0.222 3.268 0.087 3.85 0.048 4.7 0.01 5.555 0 5.827 0 8.001c0 2.172 0.01 2.444 0.048 3.297 0.04 0.852 0.174 1.433 0.372 1.942 0.205 0.526 0.478 0.972 0.923 1.417 0.444 0.445 0.89 0.719 1.416 0.923 0.51 0.198 1.09 0.333 1.942 0.372C5.555 15.99 5.827 16 8 16s2.444 -0.01 3.298 -0.048c0.851 -0.04 1.434 -0.174 1.943 -0.372a3.9 3.9 0 0 0 1.416 -0.923c0.445 -0.445 0.718 -0.891 0.923 -1.417 0.197 -0.509 0.332 -1.09 0.372 -1.942C15.99 10.445 16 10.173 16 8s-0.01 -2.445 -0.048 -3.299c-0.04 -0.851 -0.175 -1.433 -0.372 -1.941a3.9 3.9 0 0 0 -0.923 -1.417A3.9 3.9 0 0 0 13.24 0.42c-0.51 -0.198 -1.092 -0.333 -1.943 -0.372C10.443 0.01 10.172 0 7.998 0zm-0.717 1.442h0.718c2.136 0 2.389 0.007 3.232 0.046 0.78 0.035 1.204 0.166 1.486 0.275 0.373 0.145 0.64 0.319 0.92 0.599s0.453 0.546 0.598 0.92c0.11 0.281 0.24 0.705 0.275 1.485 0.039 0.843 0.047 1.096 0.047 3.231s-0.008 2.389 -0.047 3.232c-0.035 0.78 -0.166 1.203 -0.275 1.485a2.5 2.5 0 0 1 -0.599 0.919c-0.28 0.28 -0.546 0.453 -0.92 0.598 -0.28 0.11 -0.704 0.24 -1.485 0.276 -0.843 0.038 -1.096 0.047 -3.232 0.047s-2.39 -0.009 -3.233 -0.047c-0.78 -0.036 -1.203 -0.166 -1.485 -0.276a2.5 2.5 0 0 1 -0.92 -0.598 2.5 2.5 0 0 1 -0.6 -0.92c-0.109 -0.281 -0.24 -0.705 -0.275 -1.485 -0.038 -0.843 -0.046 -1.096 -0.046 -3.233s0.008 -2.388 0.046 -3.231c0.036 -0.78 0.166 -1.204 0.276 -1.486 0.145 -0.373 0.319 -0.64 0.599 -0.92s0.546 -0.453 0.92 -0.598c0.282 -0.11 0.705 -0.24 1.485 -0.276 0.738 -0.034 1.024 -0.044 2.515 -0.045zm4.988 1.328a0.96 0.96 0 1 0 0 1.92 0.96 0.96 0 0 0 0 -1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0 -8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0 -5.334"
                    strokeWidth="1"
                  ></path>
                </svg>
              </a>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="X-Twitter-Logo--Streamline-Logos" height="25" width="25">
                  <desc>X Logo Twitter Streamline Icon: https://streamlinehq.com</desc>
                  <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="M17.2705 22.464 1.5 1.53589h5.22951L22.5 22.464h-5.2295Z" strokeWidth="1"></path>
                  <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="m21.7578 1.53589 -8.313 8.91461" strokeWidth="1"></path>
                  <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="m2.24207 22.464 8.30673 -8.9078" strokeWidth="1"></path>
                </svg>
              </a>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" id="Youtube--Streamline-Font-Awesome" height="25" width="25">
                  <desc>Youtube Streamline Icon: https://streamlinehq.com</desc>
                  <path
                    d="M14.542828125 3.9492604166666663c-0.16905989583333333 -0.6365755208333334 -0.6671770833333333 -1.1379218749999997 -1.2996328124999998 -1.3080598958333332C12.096822916666666 2.332036458333333 7.499999999999999 2.332036458333333 7.499999999999999 2.332036458333333s-4.596794270833333 0 -5.743195312499999 0.3091640625c-0.6324557291666666 0.17016666666666663 -1.1305729166666667 0.6714843749999999 -1.2996328124999998 1.3080598958333332C0.15 5.103088541666666 0.15 7.510442708333333 0.15 7.510442708333333s0 2.407356770833333 0.307171875 3.561184895833333c0.16905989583333333 0.6365729166666666 0.6671770833333333 1.1170338541666667 1.2996328124999998 1.2871718749999999C2.9032057291666664 12.667963541666666 7.499999999999999 12.667963541666666 7.499999999999999 12.667963541666666s4.596794270833333 0 5.743195312499999 -0.3091640625c0.6324557291666666 -0.17013802083333332 1.1305729166666667 -0.6505963541666666 1.2996328124999998 -1.2871718749999999C14.85 9.917799479166666 14.85 7.510442708333333 14.85 7.510442708333333s0 -2.4073541666666665 -0.307171875 -3.5611822916666664ZM5.996580729166666 9.696140624999998V5.324744791666666l3.8420312499999993 2.1857526041666664 -3.8420312499999993 2.1856432291666668Z"
                    strokeWidth="1"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <span className="block text-sm lg:text-center">
            © 2024{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              GreenCure
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
