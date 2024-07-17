export default function ProfileNavbar({ setShowProfileNavbar, showProfileNavbar }) {
  return (
    <div className="border-b border-b-[#A09CAB]">
      <ul className="flex justify-between xl:px-20 lg:px-16 md:px-12 px-7 sm:px-10 text-gcPrimary-1000 text-center gcContentAccent1p">
        <li className={`${showProfileNavbar == "1" ? "border-b-4 border-b-gcPrimary-1000" : "hover:border-b-4 hover:border-b-gcPrimary-1000 transition-all"}`}>
          <button onClick={() => setShowProfileNavbar("1")} className="px-4">
            Post
          </button>
        </li>
        <li className={`${showProfileNavbar == "2" ? "border-b-4 border-b-gcPrimary-1000" : "hover:border-b-4 hover:border-b-gcPrimary-1000 transition-all"}`}>
          <button onClick={() => setShowProfileNavbar("2")} className="px-4 ">
            Monitoring
          </button>
        </li>
        <li className={`${showProfileNavbar == "3" ? "border-b-4 border-b-gcPrimary-1000" : "hover:border-b-4 hover:border-b-gcPrimary-1000 transition-all"}`}>
          <button onClick={() => setShowProfileNavbar("3")} className="px-4 ">
            Saved
          </button>
        </li>
      </ul>
    </div>
  );
}
