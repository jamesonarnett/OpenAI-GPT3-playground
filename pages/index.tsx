import Head from "next/head";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isYellow, setIsYellow] = useState<boolean>(false);
  const [year, setYear] = useState<number>(0);

  const handleYear = () => {
    setYear(new Date().getFullYear());
  };

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        try {
          setPrompt(value);
          setOutput("Loading...");
          const response = await fetch("/api/prompt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: value }),
          });
          const data = await response.json();
          setValue("");
          setIsYellow(true);
          setOutput(data.result.choices[0].text);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [value]
  );

  useEffect(() => {
    handleYear();
  }, []);

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
          <h1 className={styles.title}>God Mode</h1>
        </div>
        <div className={styles.inputDiv}>
          <p className={styles.description}>
            The Lords answer awaits - ask anything!
          </p>
          <input
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          <div className={styles.promptDiv}>
            <div>
              <p>
                Promt: <span>{prompt}</span>
              </p>
            </div>
            <div>
              <p>
                <span className={`${isYellow && styles.yellow}`}>
                  Holy Wisdom:{" "}
                </span>
                <span>
                  {output.split("\n").map((item) => (
                    <>
                      {item}
                      <br />
                    </>
                  ))}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.grid}></div>
      </main>

      <footer className={styles.footer}>
        <p>
          <a
            target={"_blank"}
            href="https://github.com/jamesonarnett"
            className={styles.footerLink}
          >
            -Jam &#10084; <span style={{ marginLeft: ".3rem" }}>{year}</span>
          </a>
        </p>
      </footer>
    </div>
  );
}
