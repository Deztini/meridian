export function HomeFooter() {
  return (
    <>
      <hr className="border-b border-gray-200" />
      <div className="px-6 py-12 flex items-center justify-between">
        <div className="flex items-center  gap-14">
          <h1 className="text-xl font-semibold font-sans">Meridian</h1>
          <h1 className="font-sans text-xs text-gray-300">
            Usage-based billing infrastructure
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-sans text-xs text-gray-300 hover:text-gray-800 cursor-pointer">
            Privacy
          </span>
          <span className="font-sans text-xs text-gray-300 hover:text-gray-800 cursor-pointer">
            Terms
          </span>
          <span className="font-sans text-xs text-gray-300 hover:text-gray-800 cursor-pointer">
            Status
          </span>
          <span className="font-sans text-xs text-gray-300 hover:text-gray-800 cursor-pointer">
            Docs
          </span>
          <span className="font-sans text-xs text-gray-300 hover:text-gray-800 cursor-pointer">
            Github
          </span>
        </div>
      </div>
    </>
  );
}
