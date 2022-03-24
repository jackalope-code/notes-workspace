import { withAuthenticator } from "@aws-amplify/ui-react";

export interface AuthProps {
    signOut: any;
    user: any;
    isPassedToWithAuthenticator: any;
}

const Account = ({isPassedToWithAuthenticator, user, signOut}: AuthProps) => {
    console.log("account route");
    return (
        <>
            <h1>Logged in as {user.username} (email {user.email})</h1>
            <button onClick={signOut}>Sign Out</button>
            <h2>Auth data</h2>
            <div>
            {JSON.stringify(user.signInUserSession, null, 2)}
            </div>
            <h2>Access token</h2>
            <div>{user.signInUserSession.accessToken.jwtToken}</div>
        </>
    )
}

export default withAuthenticator(Account);