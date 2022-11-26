import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageText, setImageText] = useState<string>("");
  const [isYellow, setIsYellow] = useState<boolean>(false);
  const [year, setYear] = useState<number>(0);

  const handleYear = () => {
    setYear(new Date().getFullYear());
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        setPrompt(value);
        setIsYellow(false);
        setOutput("Loading...");
        setImageLoading(true);
        setImageText("Loading Image...");
        const response = await fetch("/api/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: value }),
        });
        const data = await response.json();

        if (data) {
          setIsYellow(true);
          let completion = data.result.choices[0].text;
          setOutput(completion);
          await handleImage(`${value} ${completion}`);
          setValue("");
        }
      } catch (err) {
        setImageLoading(false);
        setOutput("Failed to retrieve completion, try again?");
        console.log(err);
      }
    }
  };

  const handleImage = async (prompt: string) => {
    try {
      const imageRespose = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const imageData = await imageRespose.json();

      if (imageData) {
        setImage(imageData.imageURL);
        setImageLoading(false);
      }
    } catch (err) {
      setImageLoading(false);
      setImageText("Failed to retrieve image, try again?");
      console.log(err);
    }
  };

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
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
            className={styles.input}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            ref={(input) => input && input.focus()}
          />
          <div className={styles.promptDiv}>
            <div>
              <p>
                Prompt: <span>{prompt}</span>
              </p>
            </div>
            <div>
              <p>
                <span className={`${isYellow && styles.yellow}`}>
                  Holy Wisdom:{" "}
                </span>
                <span>
                  {output.split("\n").map((item, idx) => (
                    <span key={idx}>
                      {item}
                      <br />
                    </span>
                  ))}
                </span>
              </p>
            </div>
          </div>
          {imageLoading ? (
            <div className={styles.imageDiv}>
              <p className={`${imageLoading && styles.blink}`}>{imageText}</p>
            </div>
          ) : (
            <div className={styles.imageDiv}>
              <img width={512} height={512} src={image} alt="" />
            </div>
          )}
        </div>
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
          <p style={{ textAlign: "center" }}>why?</p>
        </p>
      </footer>
    </div>
  );
}
