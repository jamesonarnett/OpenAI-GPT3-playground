import Head from "next/head";
import Image from "next/image";
import { useState, useCallback } from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [completion, setCompletion] = useState<string>("");

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setPrompt(value);
        setCompletion("Loading...");
        const response = await fetch("/api/hello", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: value }),
        });
        const data = await response.json();
        setValue("");
        setCompletion(data.result.choices[0].text);
      }
    },
    [value]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>nextBunBase-bb</title>
        <meta
          name="description"
          content="Playing with Next13, pocketBase, and Bun"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.titleDiv}>
          <h1 className={styles.title}>Its like a genie, but better</h1>
        </div>
        <div className={styles.inputDiv}>
          <p className={styles.description}>Type in a prompt - anything!</p>
          <input
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          <div>
            Prompt: <span>{prompt}</span>
          </div>
          <div>
            Completion:{" "}
            <span>
              {completion.split("\n").map((item) => (
                <>{item}</>
              ))}
            </span>
          </div>
        </div>
        <div className={styles.grid}></div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
