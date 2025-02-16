import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../lib/firebase";
import UserInfo from "../ui/UserInfo";
import Container from "../ui/Utility/Container";
import Loading from "../ui/Utility/Loading";
import Registeration from "../ui/Registeration";
import { Store } from "../lib/store";

 
 const Profile = () => {
  const { currentUser, getUserInfo, isLoading } = Store();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      // setCurrentUser(user);
      // setLoading(false);
      getUserInfo(user?.uid);
    });
    return () => {unSub();};
  }, [getUserInfo]);
console.log(currentUser)
  return (
    <Container>
      {currentUser ? <UserInfo currentUser={currentUser} /> : <Registeration />}
      {/* {currentUser ? <Registeration /> : <Registeration />} */}


      {isLoading && <Loading />}
    </Container>
  );
 };
 
 export default Profile;
 
