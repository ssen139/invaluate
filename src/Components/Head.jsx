import React from 'react'
import { Segment, Header, Image } from 'semantic-ui-react'

export const Head = () => {

    return (
        <div className="header-bg">

            <Segment color='red'>
                <Header as='h4'>
                    <Image src={process.env.PUBLIC_URL + 'logo.jpg'} size='mini' />
                    Expense Sheet
                </Header>

            </Segment>
        </div>
    );
}