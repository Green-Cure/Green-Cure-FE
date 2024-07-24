// export default function LoggedInNavbar() {
//   return (
//     <>
//       <nav className="fixed z-20 left-0 bottom-0 right-0 sm:top-0 sm:w-12 md:w-16 lg:w-20 sm:bottom-auto sm:right-auto bg-gradient-to-b from-gcPrimary-600 to-gcPrimary-basePrimary sm:p-2 py-4">
//         <ul className="flex gap-3 sm:flex-col justify-center items-center">
//           <li>Navbar</li>
//           <li>Navbar</li>
//           <li>Navbar</li>
//         </ul>
//       </nav>
//     </>
//   );
// }
export default function LoggedInNavbar() {
  return (
    <>
      <nav className="fixed z-50 left-0 bottom-0 right-0 top-auto sm:top-0 sm:bottom-auto w-full sm:right-auto sm:w-14 md:w-16 lg:w-20 flex flex-col">
        <svg className="relative w-full place-self-start hidden sm:block" width="" height="" viewBox="0 0 132 1062" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M132 10C132 4.47715 127.523 0 122 0H10C4.47715 0 0 4.47718 0 10V1052C0 1057.52 4.47715 1062 10 1062H122C127.523 1062 132 1057.52 132 1052V758.597C132 748.097 112.32 741.051 102.87 745.629C94.4454 749.711 84.99 752 75 752C39.6538 752 11 723.346 11 688C11 652.654 39.6538 624 75 624C84.99 624 94.4454 626.289 102.87 630.371C112.32 634.949 132 627.903 132 617.403V10Z"
            fill="url(#paint0_linear_125_392)"
          />
          <defs>
            <linearGradient id="paint0_linear_125_392" x1="66" y1="0" x2="66" y2="1062" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2D947F" />
              <stop offset="1" stopColor="#56C596" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="relative w-full place-self-end block sm:hidden" width="" height="" viewBox="0 0 390 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M194.5 51C213.002 51 228 36.0015 228 17.5C228 17.3191 227.999 17.1385 227.996 16.9582C227.872 9.14109 233.125 0 240.943 0H380C385.523 0 390 4.47715 390 10V29V55C390 55.5523 389.552 56 389 56H0.999988C0.44771 56 0 55.5523 0 55V29V10C0 4.47715 4.47715 0 10 0H148.057C155.875 0 161.128 9.14109 161.004 16.9582C161.001 17.1385 161 17.3191 161 17.5C161 36.0015 175.998 51 194.5 51Z"
            fill="url(#paint0_linear_239_184)"
          />
          <defs>
            <linearGradient id="paint0_linear_239_184" x1="0" y1="42.5" x2="390" y2="42.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2D947F" />
              <stop offset="0.504828" stopColor="#2D947F" />
              <stop offset="1" stopColor="#56C596" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute">
          <ul className="flex gap-3 sm:flex-col justify-center items-center">
            <li>Navbar</li>
            <li>Navbar</li>
            <li>Navbar</li>
          </ul>
        </div>
      </nav>
    </>
  );
}
