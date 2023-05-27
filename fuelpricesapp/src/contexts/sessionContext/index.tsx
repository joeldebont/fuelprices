import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useCallback, useEffect } from "react";
import { Fuel } from "utils/constants/fuelConstants";

export const SESSION_KEY = 'fuelprices.session';

export interface Session {
    fuel: Fuel;
}

export interface SessionContextValue {
    session?: Session;
    setSessionFuel: (fuel: Fuel) => void
}

const SessionContext = React.createContext<SessionContextValue>({
    session: undefined,
    setSessionFuel: (fuel: Fuel) => { }
});

interface SessionProviderProps {

}

export const SessionProvider: FC<SessionProviderProps> = (props) => {
    const [session, setSession] = React.useState<Session>();

    useEffect(() => {
        if(session == null) {
            return;
        }

        AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }, [session]);

    useEffect(() => {
        loadSession();
    }, []);

    const loadSession = async () => {
        let sessionJson = await AsyncStorage.getItem(SESSION_KEY);

        if(sessionJson == null) {
            sessionJson = '{}';
        }
        
        const session = JSON.parse(sessionJson) as Session;
        setSession(session);
    };

    const setSessionFuel = useCallback((fuel: Fuel) => {
        const currSession = {
            ...session,
            fuel
        };
        
        setSession(currSession);
    }, [session]);

    const context: SessionContextValue = React.useMemo(() => ({
        session,
        setSessionFuel
    }), [session, setSessionFuel]);

    return (
        <SessionContext.Provider value={context} {...props} />
    );
};

export const useSession = () => {
    const context = React.useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }

    return context;
};
