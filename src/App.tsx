import { createSignal } from "solid-js";
enum SearchEngine {
  Google,
  Bing,
  DuckDuck,
}
function App() {
  let inp!: HTMLInputElement;

  const engine = createSignal(SearchEngine.Google);

  return (
    <>
      <div class="container">
        <h1>Web Navigator</h1>
        <div class="main">
          <select
            value={engine[0]()}
            onchange={(e) => {
              engine[1](Number(e.target.value));
            }}
          >
            <option value={SearchEngine.Google}>Google</option>
            <option value={SearchEngine.Bing}>Bing</option>
            <option value={SearchEngine.DuckDuck}>DuckDuckGo</option>
          </select>
          <input
            type="text"
            ref={inp}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === "enter") {
                go(inp.value);
              }
            }}
            placeholder="Search or enter URL..."
          />{" "}
          <button
            onClick={() => {
              go(inp.value);
            }}
          >
            <span>Go</span>
          </button>
        </div>
      </div>
    </>
  );

  function go(q: string) {
    const a = document.createElement("a");
    a.target = "_blank";

    if (!q.includes(" ") && (q.includes(".") || q.includes(":"))) {
      if (q.includes("://")) {
        a.href = q;
      } else if (q.includes(":\\") || q.includes(":/")) {
        a.href = "file:///" + q;
      } else {
        a.href = "https://" + q;
      }
    } else {
      switch (engine[0]()) {
        case SearchEngine.Google:
          a.href = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
          break;
        case SearchEngine.Bing:
          a.href = `https://www.bing.com/search?q=${encodeURIComponent(q)}`;
          break;
        case SearchEngine.DuckDuck:
          a.href = `https://www.duckduckgo.com/search?q=${encodeURIComponent(
            q
          )}`;
          break;
      }
    }

    a.click();
    inp.value = "";
  }
}

export default App;
