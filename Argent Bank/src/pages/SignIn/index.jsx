import Footer from "../../components/Footer"
import Header from "../../components/Header"
import SignInForm from "../../components/SignInForm"

const SignIn = () => {
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <SignInForm />
      </main>
      <Footer />
    </>
  )
}

export default SignIn
