function BannerHeader({bgImg, t1, t2, des, page}) {
  return (
    <>
      <div
        className="relative bg-cover bg-center bg-no-repeat text-center max-w-full py-20 md:py-28"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-4 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {t1} <span className="text-orange-500">{t2}</span>
          </h1>
          <p className="text-gray-300 text-lg">
            {des}
          </p>
          <p className="text-gray-200 font-semibold text-sm">
            HOME &gt; <span className="text-orange-500">{page}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default BannerHeader;
