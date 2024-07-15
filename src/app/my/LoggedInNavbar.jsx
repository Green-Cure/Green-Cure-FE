function LoggedInNavbarr() {
  return (
    <>
      <nav className="fixed bg-transparent top-0 left-0 rounded-r-lg">
        <div className="w-1/2 h-full absolute bg-gradient-to-t from-gcPrimary-basePrimary to-gcPrimary-600 top-0 left-0"></div>
        <div className="relative px-1.5 py-2 z-20 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center my-4">
            <div className=" flex flex-col justify-center items-center w-full">
              <div className="border-2 rounded-xl w-full"></div>
            </div>
          </div>
        </div>
      </nav>
      {/* <div>
        <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.9333 0.724645C13.3923 0.256664 12.7075 0 12 0C11.2925 0 10.6077 0.256664 10.0667 0.724645L1.06667 8.51799C0.732612 8.80695 0.464079 9.1673 0.279837 9.57385C0.0955946 9.98041 9.0305e-05 10.4234 0 10.8717V23.6052C0 24.9271 1.04533 26 2.33333 26H6.33333C6.95217 26 7.54567 25.7477 7.98325 25.2986C8.42083 24.8495 8.66667 24.2403 8.66667 23.6052V18.1273C8.66667 17.1967 9.38933 16.4413 10.2893 16.4167H13.7107C14.145 16.4285 14.5577 16.6139 14.8608 16.9334C15.1639 17.2529 15.3335 17.6813 15.3333 18.1273V23.6052C15.3333 24.9271 16.3787 26 17.6667 26H21.6667C22.2855 26 22.879 25.7477 23.3166 25.2986C23.7542 24.8495 24 24.2403 24 23.6052V10.8704C23.9999 10.422 23.9044 9.97904 23.7202 9.57248C23.5359 9.16593 23.2674 8.80558 22.9333 8.51663L13.9333 0.724645Z"
            fill="#F5F5F5"
          />
        </svg>
      </div> */}
    </>
  );
}

export default function LoggedInNavbar() {
  return (
    <>
      <nav className="fixed left-0 bottom-0 right-0 sm:top-0 sm:w-12 md:w-16 lg:w-20 sm:bottom-auto sm:right-auto bg-gradient-to-b from-gcPrimary-600 to-gcPrimary-basePrimary sm:p-2 py-4">
        <ul className="flex gap-3 sm:flex-col justify-center items-center">
          <li>Navbar</li>
          <li>Navbar</li>
          <li>Navbar</li>
        </ul>
      </nav>
    </>
  );
}
