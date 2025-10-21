function BannerHeader({ t1, t2, des, page }) {
  return (
    <div className="banner-container relative w-full overflow-hidden rounded-2xl min-h-[400px] md:min-h-[500px] flex items-center justify-center">
      <div
        className="banner-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(./car.jpg)` }}
      ></div>

      <div className="banner-overlay absolute inset-0"></div>

      <div className="banner-animated-bg absolute inset-0 opacity-10">
        <div className="circle blue top-10 right-[10%] animate-pulse"></div>
        <div className="circle indigo bottom-10 left-[15%] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="max-w-4xl mx-auto space-y-6">

          <div className="breadcrumb inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4 animate-fade-in-down">
            <span className="breadcrumb-home">HOME</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-page">{page}</span>
          </div>

          <h1 className="banner-title animate-fade-in-up">
            {t1}{' '}
            <span className="banner-highlight">
              {t2}
              <span className="banner-highlight-line"></span>
            </span>
          </h1>

          <p className="banner-description animate-fade-in">
            {des}
          </p>

          <div className="banner-line-container animate-fade-in">
            <div className="banner-line"></div>
          </div>
        </div>
      </div>

      <div className="banner-wave absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" className="w-full h-16 md:h-20">
          <path d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,42.7C1120,43,1280,53,1360,58.7L1440,64L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"></path>
        </svg>
      </div>
    </div>
  );
}

export default BannerHeader;
