interface InfoProps {
  statusDM: boolean;
}

export default function Info(props: InfoProps) {
  const darkMode = props.statusDM
    ? "bg-slate-900 text-white"
    : "bg-white text-black";
  const HeaderClassName = props.statusDM ? "bg-slate-800" : "bg-gray-500";
  return (
    <div className={`${darkMode} sm:px-2 py-2 md:px-20`}>
      <header
        id="about"
        className={`${HeaderClassName} font-semibold p-3 rounded-lg text-white`}
      >
        <h2 className="text-3xl">About</h2>
      </header>
      <p className="text-justify p-3">
        It is an online tool developed to assist in the finding English stop
        words of texts that is easy to use and very useful. The stop words
        includes &quot;the&quot;, &quot;and&quot;, &quot;a&quot;,
        &quot;an&quot;, &quot;in&quot;, &quot;of&quot;, &quot;to&quot;,
        &quot;that&quot;, &quot;is&quot;, &quot;for&quot;. The tool&apos;s
        idealization from the context of the reactivity applied to the text
        input box, through the{" "}
        <a
          className="font-semibold"
          href="https://reactjs.org/"
          target="_blank"
          rel="noreferrer"
        >
          React.js
        </a>{" "}
        library, is one of the points to be highlighted, because from this, we
        have, spontaneously, the result of each manipulation made on the entered
        text. The tool was developed using{" "}
        <a
          className="font-semibold"
          href="https://nextjs.org/"
          target="_blank"
          rel="noreferrer"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold"
        >
          Tailwind CSS
        </a>
        .
      </p>
    </div>
  );
}
