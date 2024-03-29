import { subscription,userDetails } from "@/types";
import { 
    useSessionContext, 
    useUser as useSupaUser,
    User
} from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type userContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: userDetails | null;
    isLoading: boolean;
    subscription: subscription | null;
};

export const UserContext = createContext< userContextType | undefined > (
    undefined
);

// Props interface
export interface Props{
    [propName: string]: any;
};

export const MyUserContextProvider = (props: Props) => {
    // For Authentication
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    }=useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false); // here the false in the bracket indicates that by default it is set to FALSE value
    const [userDetails, setUserDetails] = useState<userDetails | null>(null); // here the null in the bracket indicates that by default it is set to NULL value
    const [subscription, setSubscription] = useState<subscription | null>(null);

    // For Actions
    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscription = () => 
        supabase  // basically to fetch all the subscription details. The '*' indicates for select all i.e., to fetch all data
            .from('subscription')
            .select('*, prices(*,product(*))')
            .in('status',['trialing','active'])
            .single();
    useEffect(()=>{
        if(user && !isLoadingData && !subscription){
            setIsLoadingData(true);
            Promise.allSettled([getUserDetails(),getSubscription()]).then(
                (results) => {
                    const userDetailsPromise = results[0];
                    const subscriptionPromise = results[1];

                    if(userDetailsPromise.status==="fulfilled") 
                        setUserDetails(userDetailsPromise.value.data as userDetails);

                    if(subscriptionPromise.status==="fulfilled")
                        setSubscription(subscriptionPromise.value.data as subscription);
                    
                    setIsLoadingData(false);
                }
            );
        }
        else if(!user && !isLoadingData && !isLoadingUser){
            setUserDetails(null);
            setSubscription(null);
        }
    },[user, isLoadingUser]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription,
    };

    return <UserContext.Provider value={value} {...props} />
};

export const useUser = () => {
    const context = useContext(UserContext);
    if(context===undefined)
        throw new Error('useUser must be within a MyUserContextProvider');

    return context;
};