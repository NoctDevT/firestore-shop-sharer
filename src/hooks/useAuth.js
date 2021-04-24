import React, {useEffect, useState}from "react";
import * as db from "../firestore";

function useAuth() {  
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()  =>  {
      return db.checkAuth(curUser=> {
        setLoading(false);
        setUser(curUser);
      });
    }, []);

    return {user, loading}
}

export default useAuth;
