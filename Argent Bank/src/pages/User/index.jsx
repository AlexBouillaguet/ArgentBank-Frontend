import Footer from "../../components/Footer"
import Header from "../../components/Header"
import UserHeader from "../../components/UserHeader"
import Account from "../../components/Account"

const User = () => {
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <UserHeader />
        <Account title="Argent Bank Checking (x8349)" balance="2,082.79" description="Available Balance" />
        <Account title="Argent Bank Savings (x6712)" balance="10,928.42" description="Available Balance" />
        <Account title="Argent Bank Credit Card (x8349)" balance="184.30" description="Current Balance" />
      </main>
      <Footer />
    </>
  )
}

export default User
