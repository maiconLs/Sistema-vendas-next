import Head from 'next/head'
import Nav from '../components/nav'
import Header from '../components/header'

export default function Home() {
  return (
    <div >
      <Head>
        <title>My App</title>
        <meta name="description" content="My app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav/>
      <Header title="Home" button="Nova venda"/>
      
    </div>
  )
}
