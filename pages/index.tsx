import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router';
import { useState } from 'react';

axios.defaults.baseURL = 'http://localhost:8081';

export default function Home() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleLoginClick = () => {
    router.push('/login');
  }

  const handleInputChange = (event: any) => {
    console.log(event);
    let value = event.target.value
    setInputValue(value);
  }

  const handleTransferClick = () => {
    // 
    const str = inputValue;
    // 判断传入参数是否为字符串
    if (typeof str !== 'string') {
      console.error('The parameter should be a string!');
      return null;
    }

    // 用正则表达式提取出字符串中以逗号分隔的每一项并移除多余的空格和双引号
    const regExp = /"?\s*([^" ,]+)\s*"?,?/g;
    const extractedStr = str.replace(regExp, '$1');

    // 将提取出的每一项用分号拼接
    const items = extractedStr.split(',');
    const resultStr = items.join(';');
    const output = resultStr.replace(/\n/g, ';')
    setOutputValue(output);
    return resultStr;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <button onClick={handleLoginClick}>Go to Login</button>

        <textarea placeholder="Enter your input here"
          className={styles.input}
          value={inputValue}
          onChange={handleInputChange}
        />

        <button onClick={handleTransferClick}>转换</button>

        <textarea placeholder="output"
          className={styles.input}
          value={outputValue}
          onChange={() => {}}
        />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
