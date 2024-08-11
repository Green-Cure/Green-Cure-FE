export default function MyScarecrowHistory() {
  const datas = [
    {
      name: "All About Aloe Vera, From Medicine to Cosmetic",
    },
    {
      name: "Urban Farming Boom: Cities Turn to Rooftop Gardens for Sustainable Food Sources",
    },
    {
      name: "The Healing Power of Plants: New Studies on Medicinal Herbs",
    },
    {
      name: "The Role of Plants in Combating Climate Change: How Green Spaces Improve Air Quality",
    },
  ];

  return (
    <>
      <section className="xl:1/5 sm:w-1/3 sm:block hidden">
        <div className="flex flex-col gap-3">
          <div className="flex justify-end">
            <svg className="xl:w-9 lg:w-8 md:w-7 sm:w-6 w-5 cursor-pointer" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30.2093 0L36 5.79068L31.5856 10.207L25.7949 4.41636L30.2093 0ZM9 27H14.7907L28.8562 12.9344L23.0656 7.14377L9 21.2093V27Z" fill="#7D94A6" />
              <path
                d="M30.2222 32.2222H9.74289C9.69378 32.2222 9.64278 32.2411 9.59367 32.2411C9.53133 32.2411 9.469 32.2241 9.40478 32.2222H3.77778V5.77778H16.711L20.4888 2H3.77778C1.69433 2 0 3.69244 0 5.77778V32.2222C0 34.3076 1.69433 36 3.77778 36H30.2222C31.2242 36 32.185 35.602 32.8935 34.8935C33.602 34.185 34 33.2242 34 32.2222V15.8493L30.2222 19.6271V32.2222Z"
                fill="#7D94A6"
              />
            </svg>
          </div>

          <div>
            {datas &&
              datas.length > 0 &&
              datas.map((data) => {
                return (
                  <>
                    <div className="py-5 border-t-2 border-gcSecondary-500">
                      <h3 className="gcContentAccent2p text-gcPrimary-1000 hover:underline cursor-pointer">{data.name}</h3>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
