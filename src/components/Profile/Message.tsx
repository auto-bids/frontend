import React from "react";

export default function Message(props: {datetime: string, message: string}) {
    return(
        <div className="message">
            <p>{props.message}</p>
            <p>{props.datetime}</p>
        </div>
    );
}