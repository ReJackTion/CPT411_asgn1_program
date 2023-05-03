import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { IconCopy, IconDelete } from "./Icons";

interface TextSaveProps {
  textsSaves?: [string];
  setTextsSaves?: (textsSaves: [string]) => void;
  statusDM: boolean;
  tokensSaves?: [[string]];
  setTokenSaves?: (tokensSaves: [[string]]) => void;
  isStopWordSaves?: [[boolean]];
  setIsStopWordSaves?: (isStopWordSaves: [[boolean]]) => void;
}

export default function TextSave(props: TextSaveProps) {
  const darkMode = props.statusDM ? "bg-slate-900" : "bg-white text-black";
  const HeaderClassName = props.statusDM ? "bg-slate-800" : "bg-gray-500";
  const ItemClassName = props.statusDM
    ? "bg-slate-800 hover:bg-gray-300 hover:text-black text-white"
    : "hover:bg-gray-200 text-black";

  return (
    <div className={`${darkMode} my-5`}>
      <header
        id="savedtexts"
        className={`${HeaderClassName} font-semibold p-3 rounded-lg text-white`}
      >
        <h2 className="text-3xl">Search History</h2>
      </header>
      <ul className="mt-2">
        {/* {props.textsSaves.map((text, index) => {
          return (
            <li
              key={index}
              className={`flex items-center p-1 justify-between ${ItemClassName}`}
            >
              <small className="px-3 py-1">{text}</small>

              <div className="flex ">
                <button
                  onClick={() => {
                    var texts: [string] = [...props.textsSaves];
                    texts.splice(index, 1);
                    props.setTextsSaves(texts);
                  }}
                  className="text-red-600 rounded-3xl p-2 delay-150 hover:bg-red-600 hover:text-white"
                >
                  {IconDelete}
                </button>
              </div>
            </li>
          );
        })} */}
        {props.tokensSaves.map((token, index1) => {
          return (
            <li
              key={index1}
              className={`flex items-center p-1 justify-between ${ItemClassName}`}
            >
              <div>
                {token.map((word, index2) => {
                  if (props.isStopWordSaves[index1][index2]) {
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
              {/* <small className="px-3 py-1">{text}</small> */}

              <div className="flex ">
                <button
                  onClick={() => {
                    var texts: [[string]] = [...props.tokensSaves];
                    var is_stop_words: [[boolean]] = [...props.isStopWordSaves];
                    texts.splice(index1, 1);
                    is_stop_words.splice(index1, 1);
                    props.setTokenSaves(texts);
                    props.setIsStopWordSaves(is_stop_words);
                  }}
                  className="text-red-600 rounded-3xl p-2 delay-150 hover:bg-red-600 hover:text-white"
                >
                  {IconDelete}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/*
Copy

<button onClick={() =>{
                                    
    }} className="text-blue-600 rounded-3xl p-2 delay-150 hover:bg-blue-600 hover:text-white">
        {IconCopy}
    </button>
*/
