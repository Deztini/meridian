import Image from "next/image";
import integrateImg from "../../../../public/images/integrate.png";
import { ArrowRight } from "lucide-react";

export function IntegrateSection() {
  return (
    <div className="bg-black flex items-start justify-between py-20 px-9 my-10">
      <div className="flex flex-col gap-8">
        <h1 className="font-sans text-gray-500 text-xs">SDK</h1>
        <h2 className="font-heading text-white text-5xl">
          Integrate in minutes.
        </h2>
        <h2 className="font-sans text-gray-500 text-xl w-120">
          SDKs for Python, Node.js, Go, and Ruby. Or use the REST API directly —
          it&apos;s just HTTP.
        </h2>
        <div className="flex gap-5 items-center">
          <span className="font-sans text-gray-500 hover:text-white cursor-pointer">
            Python
          </span>
          <span className="font-sans text-gray-500 hover:text-white cursor-pointer">
            Node. js
          </span>
          <span className="font-sans text-gray-500 hover:text-white cursor-pointer">
            Go
          </span>
          <span className="font-sans text-gray-500 hover:text-white cursor-pointer">
            Ruby
          </span>
        </div>
        <div className="flex items-center text-blue-600 cursor-pointer hover:underline font-sans">
          <span>Read the API docs</span>
          <ArrowRight />
        </div>
      </div>
      <div>
        <Image src={integrateImg} alt="Integrate image" className="w-190 h-120" />
      </div>
    </div>
  );
}
