import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/Provider";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { Flex, Heading, Input, Button } from "@chakra-ui/react";

const Adminlogin = () => {
  const history = useHistory();
  const { auth, user } = useAuth();
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user) {
    history.push("/dashboard");
  }

  useEffect(() => {
    const btn = document.getElementById("sign-in-button");
    if (btn) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        btn,
        {
          size: "invisible",
          callback: () => {},
        },
        auth
      );
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const appVerifier = window.recaptchaVerifier;
    setLoading(true);
    signInWithPhoneNumber(auth, "+91" + number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setSent(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const submitOTP = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(() => {
        setSent(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        background="blue.400"
      >
        <form onSubmit={handleClick} className="login">
          <Flex direction="column" background="#fff" p={20} rounded={6}>
            <Heading
              mb={5}
              fontSize={28}
              letterSpacing={2}
              fontFamily="sans-serif"
              color="blue.400"
            >
              Parkade
            </Heading>
            <Input
              placeholder="Mobile Number"
              variant="filled"
              mb={3}
              type="number"
              onChange={(e) => setNumber(e.target.value)}
            />

            {sent ? (
              <Input
                placeholder="Enter the OTP"
                variant="filled"
                mb={5}
                type="number"
                onChange={(e) => setOtp(e.target.value)}
              />
            ) : null}

            {sent ? (
              <Button
                backgroundColor="blue.400"
                color="#fff"
                type="submit"
                onClick={submitOTP}
                disabled={loading}
              >
                Confirm OTP
              </Button>
            ) : (
              <Button
                background="blue.400"
                color="#fff"
                type="submit"
                id="sign-in-button"
                disabled={loading}
              >
                Login
              </Button>
            )}
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default Adminlogin;
