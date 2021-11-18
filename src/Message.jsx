import React, { forwardRef } from 'react';
import { Card, CardContent, Typography } from '@mui/material/';
import styled from 'styled-components';

const Name = styled.div`
    margin-top: 10px;
    padding:0 10px;
    text-align: ${props => props.direction};
    color: gray;
`
const Message = forwardRef(({message, user}, ref) => {
    const isUser = user === message.username; // will give a boolean value;
  
    let cardStyle = {
            margin: "10px",
            backgroundColor: "#e8e8e8",
            minWidth: "50px", 
            width: "fit-content", // value is self explanatory, seems like auto.
            maxWidth: "70vw",
    }
    let cardStyleUser = {
        margin: "10px",
        marginLeft: "auto",
        backgroundColor: "#0b81ff",
        color: "white",
        minWidth: "50px", 
        maxWidth: "70vw",
        width: "fit-content" // value is self explanatory, seems like auto.
    }
    return (
        <div ref={ref}>
            <Name direction={isUser ? "right" : "left"}>{message.username}</Name>
            <Card style={isUser ? cardStyleUser : cardStyle}>
                <CardContent>
                    <Typography>
                        {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message;
