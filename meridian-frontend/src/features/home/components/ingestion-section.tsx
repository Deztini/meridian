import Image from "next/image";
import ingestionImg from "../../../../public/images/ingestion.png";

export function IngestionSection() {
  return (
    <>
      <div className="flex items-center justify-between px-8 py-24">
        <div className="flex flex-col gap-5">
          <h1 className="font-sans text-[16px] text-gray-500">INGESTION</h1>
          <h2 className="font-heading text-4xl">
            Accept events from anywhere.
          </h2>
          <h1 className="font-sans text-[16px] text-gray-500 max-w-150">
            HTTP, SDKs, or batch upload. Every event is idempotent — send
            duplicates safely. We handle deduplication, ordering, and late
            arrivals automatically.
          </h1>
          <div>
            <ul className="list-disc ml-4">
              <li className="font-sans text-[16px] text-gray-500">
                Idempotent by default
              </li>
              <li className="font-sans text-[16px] text-gray-500">
                Accepts backdated events
              </li>
              <li className="font-sans text-[16px] text-gray-500">
                Batch ingest up to 10,000/req
              </li>
              <li className="font-sans text-[16px] text-gray-500">
                Real-time and async modes
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Image src={ingestionImg} alt="Ingestion img" />
        </div>
      </div>
      <hr className="border-t border-gray-300" />
    </>
  );
}
