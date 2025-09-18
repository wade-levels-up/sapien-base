import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type LoadingProps = {
  text?: string;
};

export default function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-2">
        <h2>{text}</h2>
        <FontAwesomeIcon className="fa-spin fa-2xl" icon={faSpinner} />
      </div>
    </div>
  );
}
