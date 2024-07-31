export default function WeatherCard({ dataWheather }) {
  return (
    <div
      className={`w-full h-full rounded-2xl sm:mt-0 mt-1.5 flex justify-between relative transition-all ${
        dataWheather?.condition.toLowerCase().includes("sunny")
          ? "bg-weather-radial-cerah"
          : dataWheather?.condition.toLowerCase().includes("berawan")
          ? "bg-weather-radial-berawan"
          : dataWheather?.condition.toLowerCase().includes("rain")
          ? "bg-weather-radial-hujan"
          : dataWheather?.condition.toLowerCase().includes("badai")
          ? "bg-weather-radial-badai"
          : dataWheather?.condition.toLowerCase().includes("bersalju")
          ? "bg-weather-radial-bersalju"
          : "bg-weather-radial-berawan"
      }`}
    >
      <div className="flex sm:flex-col flex-row sm:items-start items-center gap-5 sm:gap-0 m-5">
        <h1 className="xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-light font-Poppins text-gcNeutrals-baseWhite gcDropShadow">{dataWheather?.temperature}&deg;</h1>
        <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl xl:text-4xl gcDropShadow text-gcNeutrals-baseWhite capitalize">{dataWheather?.condition}</h3>
      </div>
      <img
        src={`/images/${
          dataWheather?.condition.toLowerCase().includes("sunny")
            ? "weather-sun.png"
            : dataWheather?.condition.toLowerCase().includes("berawan")
            ? "weather-clouds.png"
            : dataWheather?.condition.toLowerCase().includes("rain")
            ? "weather-rainy.png"
            : dataWheather?.condition.toLowerCase().includes("badai")
            ? "weather-thunderstorm.png"
            : dataWheather?.condition.toLowerCase().includes("bersalju")
            ? "weather-snow.png"
            : "weather-sun.png"
        }`}
        alt={`${dataWheather?.condition}`}
        className="place-self-end xl:h-56 lg:h-44 md:h-28 sm:h-24 h-28 absolute bottom-0 right-0"
      />
    </div>
  );
}
