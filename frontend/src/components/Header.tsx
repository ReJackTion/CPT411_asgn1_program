interface HeaderProps {
  statusDM: boolean;
}

export default function Header(props: HeaderProps) {
  const darkModeHeader = props.statusDM ? "bg-stone-600" : "bg-gray-500";
  return (
    <header className={`md:px-16 text-white pt-10 pb-4 px-6 ${darkModeHeader}`}>
      <h1 className="mt-9 text-4xl">English stop words finder</h1>
      <h2>Online web app text English stop word finder using DFA.</h2>
    </header>
  );
}
