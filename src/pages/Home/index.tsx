import { FC, useContext, useEffect } from "react";
import Layout from "../../components/Layout";
import UserContext from "../../contexts/UserContext";
import AuthContext from "../../contexts/AuthContext";
import Greetings from "./Greetings";
import Content from "./Content";

const Home: FC = () => {
  const { user, getUser, isLoading } = useContext(UserContext);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <Layout>
      <Greetings firstName={user?.userInfos.firstName} isLoaded={!isLoading} />
      <Content />
    </Layout>
  );
};

export default Home;
