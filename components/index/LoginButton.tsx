import Link from "next/link";

const LoginButton = ({ session }:any) => {
  return (
    <>
      {!session ? (
        <Link className="btn-primary" href="/login">
          Log in
        </Link>
      ) : (
        <Link className="btn-primary" href="/dashboard">
          Dashboard
        </Link>
      )}
    </>
  );
};

export default LoginButton;
