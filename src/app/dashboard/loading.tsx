import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-2">
        <h2>Fetching Data...</h2>
        <FontAwesomeIcon className="fa-spin fa-2xl" icon={faSpinner} />
      </div>
    </div>
  );
}
