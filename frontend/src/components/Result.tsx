import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { IconCopy, IconDelete } from "./Icons";

interface ResultProps {
  textsSaves?: [string];
  setTextsSaves?: (textsSaves: [string]) => void;
  statusDM: boolean;
  tokensSaves?: [[string]];
  setTokenSaves?: (tokensSaves: [[string]]) => void;
  isStopWordSaves?: [[boolean]];
  setIsStopWordSaves?: (isStopWordSaves: [[boolean]]) => void;
  occurrence: any;
  total: number;
}

export default function Result(props: ResultProps) {
  const darkMode = props.statusDM
    ? "bg-slate-900 text-white"
    : "bg-white text-black";
  const HeaderClassName = props.statusDM ? "bg-slate-800" : "bg-gray-500";
  const ItemClassName = props.statusDM
    ? "bg-slate-800 hover:bg-gray-300 hover:text-black text-white"
    : "hover:bg-gray-200 text-black";

  console.log("occurrence", props.occurrence);

  return (
    <div className={`${darkMode} my-5`}>
      <header
        id="savedtexts"
        className={`${HeaderClassName} font-semibold p-3 rounded-lg text-white`}
      >
        <h2 className="text-3xl">Result</h2>
      </header>

      {props.occurrence ? (
        <>
          <ul className="mt-2">
            <li
              className={`flex items-center p-1 justify-between ${ItemClassName}`}
            >
              <div>
                {props.tokensSaves.at(-1).map((word, index2) => {
                  if (props.isStopWordSaves.at(-1)[index2]) {
                    return (
                      <small key={index2} className="font-bold text-green-600">
                        &nbsp;{word}
                      </small>
                    );
                  } else {
                    return <small key={index2}>&nbsp;{word}</small>;
                  }
                })}
              </div>
            </li>
          </ul>
          <small className={`${darkMode}`}>
            Total stop words found: {props.total}
          </small>
          <div className="overflow-x-auto my-3">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Stop word
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Occurrance
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(props.occurrence).map(([key, value]) => (
                  <>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {key}
                      </th>
                      <td className="px-6 py-4">{value ? value : "0"}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <small className="text-white mx-2">No result yet</small>
      )}
    </div>
  );
}
