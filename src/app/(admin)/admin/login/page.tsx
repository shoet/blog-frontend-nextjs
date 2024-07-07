import { Metadata, ResolvingMetadata } from "next";

export const generateMetadata = async (
  _: any,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title } = await parent;
  return {
    title: `Login | ${title?.absolute}`,
    description: "Login page",
  };
};

const LoginPage = () => {
  return <div>login page</div>;
};

export default LoginPage;
